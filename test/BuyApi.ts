import { initChai } from './support/setup'
import { BuyApi } from '../src/BuyApi'
import Diag, { LogLevel } from '../src/shared/Diag'
import * as _ from 'lodash'
import { ItemSummary } from '../src/EbayTypes'

const expect = initChai()

Diag.Level = LogLevel.INFO

const D = new Diag('test/BuyApi'); // <- NOTE rare case where semicolon is necessary for TSC

describe('BuyApi', function () {
  // const EBAY_BASE_URL_PROD = 'https://api.ebay.com'
  const EBAY_BASE_URL_SANDBOX = 'https://api.sandbox.ebay.com'

  let API: BuyApi

  function newBuyApi() {
    const ebayEnvironment = require('../data/private/ebay-oauth.json')
    ebayEnvironment['baseURL'] = EBAY_BASE_URL_SANDBOX
    return new BuyApi(ebayEnvironment, '5338237258')
  }

  beforeEach(function () {
    // runs before each test in this block
    BuyApi._mockResponseStack = []
    API = newBuyApi()
  })

  function pushAuthorizationMockResponse () {
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({
        'access_token': 'BLAHBLAHBLAH',
        'expires_in': 7200,
        'refresh_token': 'N/A',
        'token_type': 'Application Access Token'
      })
    }
    BuyApi._mockResponseStack.push(mockResponse)
  }

  describe('refreshTokens', function () {
    it('should succeed', function () {
      pushAuthorizationMockResponse()
      return API.refreshTokens().then(() => {
        // good!
        expect(API).to.have.property('tokens')
        expect(API.tokens).to.have.property('token_type', 'Application Access Token')
        expect(API.tokens).to.have.property('expires_at')
        let expires = parseFloat(API.tokens.expires_at)
        expect(expires).to.be.above(Date.now())
        return expect(API.tokens).to.have.property('access_token', 'BLAHBLAHBLAH')
      })
    })
    it('should throw on invalid response body', function () {
      const mockResponse = {
        statusCode: 200,
        body: JSON.stringify({
          'errors': [
            {
              'errorId': 15008,
              'domain': 'API_ORDER',
              'category': 'REQUEST',
              'message': 'Invalid Field : itemId.',
              'inputRefIds': [
                '$.lineItemInputs[0].itemId'
              ],
              'parameters': [
                {
                  'name': 'itemId',
                  'value': '2200077988|0'
                }
              ]
            }
          ]
        })
      }
      BuyApi._mockResponseStack.push(mockResponse)
      return expect(API.refreshTokens()).to.eventually.be.rejectedWith(/Error response from ebay/)
    })
    it('should throw on invalid response HTTP Status', function () {
      const mockResponse = {
        statusCode: 401,
        body: JSON.stringify({})
      }
      BuyApi._mockResponseStack.push(mockResponse)
      return expect(API.refreshTokens()).to.eventually.be.rejectedWith(/eBay returned an error while refreshing tokens. Status code: 401./)
    })
  })

  describe('search', function () {
    it('should return all items from multiple pages', async function () {
      pushAuthorizationMockResponse()
      // create mock pages responses:
      let total = 101
      let pageSize = 5
      const mockSearchResultTemplate = {
        'href': 'MOCK/search?limit=5&category_ids=27386&offset=0',
        'total': total,
        'next': 'MOCK/search?limit=5&category_ids=27386&offset=5',
        'limit': pageSize,
        'offset': 0,
        'itemSummaries': []
      }
      for (let offset = 0; offset < total; offset += pageSize) {
        let mockPage = Object.assign({}, mockSearchResultTemplate)
        mockPage.itemSummaries = _.range(Math.min(pageSize, total - offset)).map(i => Object.assign({}, { itemId: `${i + offset}` }))
        mockPage.offset = offset
        mockPage.total = total
        mockPage.limit = pageSize
        mockPage.href = `MOCK/search?limit=5&category_ids=27386&offset=${offset}`,
        mockPage.next = `MOCK/search?limit=5&category_ids=27386&offset=${offset + pageSize}`
        if (offset + pageSize >= total) {
          delete mockPage['next']
        }
        // put it into a mock response:
        const mockResponse = {
          statusCode: 200,
          body: JSON.stringify(mockPage)
        }
        BuyApi._mockResponseStack.push(mockResponse)
      }
      BuyApi._mockResponseStack.reverse()
      let itemCount = 0
      const DAYS = 1000 * 60 * 60 * 24
      const itemEndDate = new Date(Date.now() + (7 * DAYS))
      const options = {
        category_ids: [27386],
        sort: '-itemEndDate',
        filter: [
          `itemEndDate:[..${itemEndDate.toISOString()}]`
        ]
      }
      for await (let item of API.search(options)) {
        expect(item).to.not.be.null
        itemCount++
      }
      expect(itemCount).to.equal(101)
    })
  })

  describe('searchPage', function () {
    it('should return page', async function () {
      BuyApi._mockResponseStack.push(require('./test-data/BuyApi-searchPage-should-return-page.json'))
      pushAuthorizationMockResponse()
      
      const options = {
        category_ids: [27386]
      }
      let page = await API.searchPage(options)
      expect(page).to.not.be.null
      expect(page.itemSummaries).to.have.length.greaterThan(0)
      for (let item of page.itemSummaries) {
        expect(item).to.have.property('itemAffiliateWebUrl')
        expect(item.itemAffiliateWebUrl).to.be.not.null
        D.debug(`Found item ${item.title} with buying options ${item.buyingOptions}, affiliateHref: ${item.itemAffiliateWebUrl}`)
      }
    })
  })

  describe('getItem', function () {
    const testItemID = "v1|110224337049|0"

    it('with default fieldGroups', async function () {
      BuyApi._mockResponseStack.push(require('./test-data/BuyApi-getItem-with-default-fieldGroups.json'))
      pushAuthorizationMockResponse()

      let item = await API.getItem(testItemID)
      expect(item).to.not.be.null
      // adding and accessing this field pretty gross, but is actually the bulk of the work in that class is around building the right URL:
      expect(item).to.have.property('requestUrl', 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110224337049|0')
    })

    it('with PRODUCT fieldGroups', async function () {
      BuyApi._mockResponseStack.push(require('./test-data/BuyApi-getItem-with-PRODUCT-fieldGroups.json'))
      pushAuthorizationMockResponse()

      let item = await API.getItem(testItemID, ['PRODUCT'])
      expect(item).to.not.be.null
      expect(item).to.have.property('requestUrl', 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110224337049|0?fieldgroups=PRODUCT')
    })

    it('with COMPACT fieldGroups', async function () {
      BuyApi._mockResponseStack.push(require('./test-data/BuyApi-getItem-with-COMPACT-fieldGroups.json'))
      pushAuthorizationMockResponse()

      let item = await API.getItem(testItemID, ['COMPACT'])
      expect(item).to.not.be.null
      expect(item).to.have.property('requestUrl', 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110224337049|0?fieldgroups=COMPACT')         
    })
  })

  // skipping because they're slow and pounding ebay's sandbox.
  describe.skip('eBay live sandbox tests', function () {
    // Basically just don't push any mock responses, and it will run against eBay's sandbox:
    describe('search', function () {
      it('should return results', async function () {
        this.timeout(30000)
        let itemCount = 0
        const options = {
          category_ids: [27386]
        }
        for await (let item of API.search(options)) {
          expect(item).to.not.be.null
          expect(item).to.have.property('itemAffiliateWebUrl')
          expect(item.itemAffiliateWebUrl).to.be.not.null
          D.debug(`Found item ${item.title} with buying options ${item.buyingOptions}, affiliateHref: ${item.itemAffiliateWebUrl}`)
          if (itemCount++ > 25) {
            D.debug('Printed out 25 items. Bailing!')
            break
          }
        }
        D.debug(`Found ${itemCount} items!`)
        expect(itemCount).to.be.greaterThan(0)
      })
    })

    describe('searchPage', function () {
      it('should return page', async function () {
        this.timeout(30000)
        let itemCount = 0
        const options = {
          category_ids: [27386]
        }
        let page = await API.searchPage(options)
        expect(page).to.not.be.null
        expect(page.itemSummaries).to.have.length.greaterThan(0)
        for (let item of page.itemSummaries) {
          expect(item).to.have.property('itemAffiliateWebUrl')
          expect(item.itemAffiliateWebUrl).to.be.not.null
          D.debug(`Found item ${item.title} with buying options ${item.buyingOptions}, affiliateHref: ${item.itemAffiliateWebUrl}`)
        }
      })
    })

    describe('getItem', function () {
      let testItemID
      before(async function () {
        // get one testItemID for the tests below
        let page = await newBuyApi().searchPage({ limit: 1, offset: 0, category_ids: [27386] })
        testItemID = page.itemSummaries[0].itemId
      })
      
      describe('should return an item', function () {
        it('with default fieldGroup', async function () {
          let item = await API.getItem(testItemID)
          expect(item).to.not.be.null
        })
        it('with PRODUCT fieldGroups', async function () {
          let item = await API.getItem(testItemID, ['PRODUCT'])
          expect(item).to.not.be.null
          // this fields pretty gross, but is actually the bulk of the work in that class is around building the right URL:
          expect(item).to.have.property('requestUrl', 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110224337049|0?fieldgroups=PRODUCT')
        })
        it('with COMPACT fieldGroups', async function () {
          let item = await API.getItem(testItemID, ['COMPACT'])
          expect(item).to.not.be.null
          expect(item).to.have.property('requestUrl', 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110224337049|0?fieldgroups=COMPACT')         
        })

        it('with COMPACT+PRODUCT fieldGroups', async function () {
          let item = await API.getItem(testItemID, ['COMPACT', 'PRODUCT'])
          expect(item).to.not.be.null
          expect(item).to.have.property('requestUrl', 'https://api.sandbox.ebay.com/buy/browse/v1/item/v1|110224337049|0?fieldgroups=COMPACT,PRODUCT')         
        })
      })
    })
  })
})
