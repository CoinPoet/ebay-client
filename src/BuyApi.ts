import * as assert from 'assert'
import * as BpPromise from 'bluebird'
import * as request from 'request'
import * as _ from 'lodash'
import Diag from './shared/Diag'
import { ItemSummary, SearchPagedCollection, Item } from './EbayTypes'

const D = new Diag('BuyApi'); // <- NOTE rare case where semicolon is necessary for TSC

// Below because https://stackoverflow.com/questions/43694281/ts2318-cannot-find-global-type-asynciterableiterator-async-generator/43694282#43694282
// (<any>Symbol)["asyncIterator"] = (<any>Symbol).asyncIterator || Symbol.for("asyncIterator");

/**
 * Provides access to the eBay Buy API.
 */
export class BuyApi {
  private oauthCredentials: EbayOAuthCredentials
  private affiliateCampaignId: string
  private tokens: EbayTokens
  // For tests to push request responses onto the stack
  static _mockResponseStack: Array<any>

  /**
   * Creates a new instance of `BuyApi`.
   * @param oauthCredentials The OAuth credentials for eBay from developer.ebay.com
   * @param affiliateCampaignId Your affiliate campaign ID from eBay Partner Network (https://epn.ebay.com/). Specify this to ensure links will be attributed to your campaign.
   * @param tokens Specify raw tokens to override `credentials`. If specifying credentials do not specify this.
   */
  constructor (oauthCredentials: EbayOAuthCredentials, affiliateCampaignId = '', tokens: EbayTokens = null) {
    this.tokens = tokens
    this.oauthCredentials = oauthCredentials
    this.affiliateCampaignId = affiliateCampaignId
  }

  refreshTokens () {
    // https://developer.ebay.com/api-docs/static/oauth-client-credentials-grant.html
    const formData = {
      grant_type: 'client_credentials',
      redirect_uri: this.oauthCredentials.redirectUrlName,
      scope: 'https://api.ebay.com/oauth/api_scope'
    }
    const base64Creds = Buffer.from(`${this.oauthCredentials.clientID}:${this.oauthCredentials.clientSecret}`).toString('base64')
    const options = {
      method: 'POST',
      url: `${this.oauthCredentials.baseURL}/identity/v1/oauth2/token`,
      form: formData, // <- Note that request.post will translate `form` to application/x-www-form-urlencoded data
      headers: {
        Authorization: `Basic ${base64Creds}`
      }
    }
    D.debug('Refreshing tokens request:', options)
    return BuyApi.httpRequestImpl(options)
      .then((httpResponse) => {
        if (httpResponse.statusCode !== 200) {
          D.error(`eBay returned an error while refreshing tokens. Status code: ${httpResponse.statusCode}. Status message: ${httpResponse.statusMessage}.  Full response body:`, httpResponse.body)
          throw new Error(`eBay returned an error while refreshing tokens. Status code: ${httpResponse.statusCode}. Status message: ${httpResponse.statusMessage}. Body:${httpResponse.body}`)
        }
        if (!('body' in httpResponse)) {
          throw new Error('Expected httpResponse to have a body!')
        }
        const body = JSON.parse(httpResponse.body)
        /* Expected Response:
        When you issue the client credentials grant request, eBay returns a JSON object that contains an Application access token, as shown in the response below:
        {
          "access_token":"v^1.1#i^1#p^1#r^0#I^3#f^0#t^H4s ... wu67e3xAhskz4DAAA",
          "expires_in":7200,
          "refresh_token":"N/A",
          "token_type":"Application Access Token"
        }
        */
        let response: EbayTokens = { access_token: '', token_type: '', expires_at: '' }
        const expectedProps = ['access_token', 'token_type', 'expires_in']
        if (!_.every(expectedProps, p => p in body)) {
          D.error('Invalid response from eBay token endpoint:', body)
          throw new Error('Error response from ebay (logged).')
        }
        expectedProps.forEach(p => { response[p] = body[p] })
        response.expires_at = String(Date.now() + body.expires_in * 1000)
        this.tokens = response
        return response
      })
  }

  private ensureValidAccessTokens () {
    return BpPromise.try(() => {
      if (this.tokens &&
        'access_token' in this.tokens &&
        'expires_in' in this.tokens &&
        'expires_at' in this.tokens &&
        parseFloat((<any>this.tokens).expires_at) > Date.now()) {
        return this.tokens
      } else {
        return this.refreshTokens()
      }
    })
  }

  private getDefaultHeaders () {
    /*
    See https://developer.ebay.com/api-docs/buy/static/api-browse.html#Headers
    This header is used by the Browse API. If you are an eBay Network Partner and want the URL to the View Item page with the affiliate tracking ID returned, you must pass in the X-EBAY-C-ENDUSERCTX header in the search, getItem, getItemsByItemGroup , and getItemByLegacyId call requests. When you use this header, the affiliate tracking ID is returned in the itemAffiliateWebUrl field. To ensure revenue sharing, you should also include this header in all the Order API checkout call requests.
    For example
    X-EBAY-C-ENDUSERCTX affiliateCampaignId=ePNCampaignId,affiliateReferenceId=referenceId
    */
    const headers = {
      'X-EBAY-C-ENDUSERCTX': this.affiliateCampaignId ? `affiliateCampaignId=${this.affiliateCampaignId}` : '',
      'Authorization': `Bearer ${this.tokens.access_token}`
    }
    D.debug('sending headers:', headers)
    return headers
  }

  /* NOTE: Async Generator support in NodeJS is /almost/ here: http://node.green/#ESNEXT-candidate--stage-3--Asynchronous-Iterators
   *       This works because TypeScript.
   * Also note https://stackoverflow.com/questions/43694281/ts2318-cannot-find-global-type-asynciterableiterator-async-generator/43694282#43694282 for solutions
  */

  /** 
   * Searches for and returns summary of items.
   * eBay Docs at https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
   * @param {string} query
  */
  public async * search (options: SearchInput): AsyncIterator<ItemSummary> {
    do {
      let rawResult = await this.searchPage(options)
      D.debug(`page returned ${_.size(rawResult.itemSummaries)} itemSummaries, total=${rawResult.total}, offset=${rawResult.offset}, limit=${rawResult.limit}`) 
      for (let item of rawResult.itemSummaries) {
        yield (item as ItemSummary)
      }
      options.offset = options.offset || 0
      options.offset = options.offset + _.size(rawResult.itemSummaries)
      if (!rawResult || options.offset >= rawResult.total) {
        break;
      }
    } while (true)
  }

  /**
   * This is basically `search` but returns only a single Page of itemSummary results at a time.
   * This is useful to avoid the use of async generators since webpack is a house of cards and will waste your time (and will be unnecessary when nodejs v10).
   * @param {SearchInput} options Search options. Be sure to use limit/offset to get the exact page you want here
   */
  public async searchPage (options: SearchInput): Promise<SearchPagedCollection> {
    // map the properties on options into the url string:
    const mapArray = a => _.map(a, s => encodeURIComponent(s as string)).join(',')
    const mapStr =  s => encodeURIComponent(s)
    let qs = ''
    if (options) {
      let sep = '?'
      for (let key of _.keysIn(options)) { // TODO: Security: Check for allowed keys in options
        let value = options[key]
        let mapValueFunc = _.isString(value) || _.isNumber(value) ? mapStr : mapArray
        qs += `${sep}${key}=${mapValueFunc(value)}`
        sep = '&'
      }
    }
    // return result:
    let path = '/buy/browse/v1/item_summary/search' + qs
    let requestUrl = this.oauthCredentials.baseURL + path
    D.debug(`search: retrieving requestUrl:`, requestUrl)
    let raw = await this.httpRequest('GET', '', requestUrl)
    let rawResult = JSON.parse(raw.body)
    // this is a slightly gross way to enable testing. Since the bulk of this class is really about building the right URL
    rawResult.requestUrl = requestUrl
    return rawResult
  }

  /**
   * Returns details for the specified item.
   * See https://developer.ebay.com/api-docs/buy/browse/resources/item/methods/getItem
   * @param itemId The eBay identifier of an item
   * @param fieldGroups Specifies the fields to return. Can be `'PRODUCT'` or `'COMPACT'`.
   */
  public async getItem (itemId: string, fieldGroups: Array<string> = []): Promise<Item> {
    if (!itemId) {
      throw new Error('itemId must be specified')
    }
    let requestUrl = this.oauthCredentials.baseURL + `/buy/browse/v1/item/${itemId}`
    requestUrl = requestUrl + (_.isArray(fieldGroups) && _.size(fieldGroups) ? `?fieldgroups=${fieldGroups.join(',')}` : '')
    D.debug('getItem requestUrl:', requestUrl)
    let raw = await this.httpRequest('GET', '', requestUrl)
    let rawResult = JSON.parse(raw.body)
    // this is a slightly gross way to enable testing. Since the bulk of this class is really about building the right URL
    rawResult.requestUrl = requestUrl
    return rawResult
  }

  private httpGet (path) {
    return this.httpRequest('GET', path)
  }

  /**
   * Makes the specified http request to the API
   * @param {*string} httpMethod http method (default: "GET")
   * @param {*string} path http request path (relative to the API base URL)
   * @param {*string} body entity body for PATCH, POST and PUT requests
   */
  private httpRequest (httpMethod, path, url = '', body = '', throwOnError = true) {
    return BpPromise.try(() => {
      return this.ensureValidAccessTokens().then(() => {
        if (!path.startsWith('/')) {
          path = '/' + path
        }
        // https://www.npmjs.com/package/request#requestoptions-callback
        const options: any = {
          url: url || this.oauthCredentials.baseURL + path,
          method: httpMethod || 'GET',
          headers: this.getDefaultHeaders()
        }
        if (body) {
          options['body'] = body
        }
        return BuyApi.httpRequestImpl(options).then(httpResponse => {
          if (httpResponse.statusCode < 200 || httpResponse.statusCode >= 300) {
            if (throwOnError) {
              throw new Error(`Unexpected statusCode from Ebay:${httpResponse.statusCode}. Response body:${httpResponse.body}`)
            }
          }
          return httpResponse
        })
      })
    })
  }

  private static httpRequestImpl (options) {
    // https://www.npmjs.com/package/request#requestoptions-callback
    // In tests, the test can push on some httpResponse results to mock the actual HTTP API. We serve those here:
    if (BuyApi._mockResponseStack && BuyApi._mockResponseStack.length > 0) {
      return BpPromise.resolve(BuyApi._mockResponseStack.pop())
    }
    return BpPromise.fromCallback(cb => request(options, cb), { multiArgs: true }).then(responseValues => {
      // NOTE: below log line can be used to create mock responses for test files
      D.debug('\n\n mock response data:', JSON.stringify({ statusCode: responseValues[0].statusCode, body: responseValues[0].body }), '\n\n')
      // request returns an array where the first element is the responseObject and the second is the body (which is also available via response.body). I'm simplifying here.
      return responseValues[0]
    })
  }
}

/**
 * Input parameters for `BuyApi.search`.
 */
export interface SearchInput {
  /** 
   * This field lets you search by the Global Trade Item Number of the item as defined by http://www.gtin.info. This can be a UPC (Universal Product Code), EAN (European Article Number), or an ISBN (International Standard Book Number) value. 
  */
  gtin?: number
  /**
   * The EPID is the eBay product identifier of a product from the eBay product catalog. Only items in the specified EPID are returned.
  */
  epid?: string
  /**
   * The aspect name/value pairs and category, which is required, to use to limit the results. For example, in a clothing category one aspect pair would be Color/Red.
  */
  aspect_filter?: Array<string>
  /**
   * This field lets you control what is to be returned in the response. The default is MATCHING_ITEMS, which returns the items that match the keyword or category specified. The other values return data that can be used to create histograms.
   */
  fieldgroups?: Array<string>
  /**
   * The number of items to skip in the result set. This is used with the limit field to control the pagination of the output.
   * If offset is 0 and limit is 10, the call will retrieve items 1-10 from the list of items returned, if offset is 10 and limit is 10, the call will retrieve items 11 thru 20 from the list of items returned.
   * Valid Values: 0-10,000 (inclusive)
   * Default: 0
   * Maximum number of items returned: 10,000 
  */
  offset?: number
  /**
   * The number of items in a result set.
   * Default: 50
   * Maximum per result set: 200
   * Maximum number of items returned: 10,000 
   */
  limit?: number
  /**
   * Specifies the order and the field name to use to sort the items. To sort in descending order use - before the field name. 
   */
  sort?: string
  /**
   * This field supports multiple field filters that can be used to use to limit/customize the result set.
   */
  filter?: Array<string>
  /**
   * The category IDs to use to limit the results. This field can have one category ID or a comma separated list of IDs.
   */
  category_ids?: Array<number>
  /**
   * A string consisting of one or more keywords that are used to search for items on eBay. The keywords are handled as follows: 
   * - If the keywords are separated by a comma (iphone,ipad), the query returns items that have iphone AND ipad.
   * - If the keywords are separated by a space (iphone ipad or iphone, ipad), the query returns items that have iphone OR ipad. 
   * The call must have category_ids, epid, gtin, or q (or any combination of these) 
   */
  query?: string 
}

/**
 * Represents raw eBay OAuth tokens.
 */
export interface EbayTokens {
  access_token: string
  token_type: string
  expires_at: string
}

/**
 * Represents eBay OAuth credentials.
 */
export interface EbayOAuthCredentials {
  baseURL: string,
  clientID: string,
  clientSecret: string,
  redirectUrlName: string
}
