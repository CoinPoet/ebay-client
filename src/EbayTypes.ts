/**
 * NOTE: I extracted relevant types from the swagger editor generated TypeScript Node client at http://editor2.swagger.io/#!/
 * Using the eBay-provided OpenAPI v2 YAML spec.
 */

/**
* The type that defines the item details for a specific item.
*/
export class ItemSummary {
  /**
  * This container is an array of URLs for Gallery Plus images of the item listing.
  */
  'additionalImages': Array<Image>;
  /**
  * This indicates if the item is for adults only. For more information about adult-only items on eBay, see Adult items policy for sellers and Searching for adult only items for buyers.
  */
  'adultOnly': boolean;
  /**
  * This integer value indicates the total number of bids that have been placed for an auction item. This field is only returned for auction listings.
  */
  'bidCount': number;
  /**
  * The value returned in this field indicates the buying option for the item. FIXED_PRICE is returned for basic fixed-price listings, AUCTION is returned for auction listings without Buy It Now feature, and both FIXED_PRICE and AUCTION are returned for auction listings enabled with the Buy It Now feature.
  */
  'buyingOptions': Array<string>;
  /**
  * This container consists of the primary listing category Id of the item (as well as secondary listing category if item was listed in two categories).
  */
  'categories': Array<Category>;
  /**
  * The condition of the item, such as New or Used.
  */
  'condition': string;
  /**
  * The identifier of the condition. For example, 1000 is the identifier for NEW.
  */
  'conditionId': string;
  'currentBidPrice': ConvertedAmount;
  'distanceFromPickupLocation': TargetLocation;
  /**
  * The value returned in this field indicates the energy efficiency rating of the item. Energy efficiency ratings apply to products listed by commercial vendors in electronics categories only. Currently, this field is only applicable for the Germany site, and this field is only returned if the seller specified the energy efficiency rating through item specifics at listing time. Rating values include A+++, A++, A+, A, B, C, D, E, F, and G.
  */
  'energyEfficiencyClass': string;
  /**
  * An EPID is the eBay product identifier of a product from the eBay product catalog. This indicates the product in which the item belongs.
  */
  'epid': string;
  'image': Image;
  /**
  * The URL to the View Item page of the item, which includes the affiliate tracking Id. This field is only returned if the seller enables affiliate tracking for the listing by including the X-EBAY-C-ENDUSERCTX request header in the call.
  */
  'itemAffiliateWebUrl': string;
  /**
  * The HATEOAS reference of the parent page of the item group. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc. Note: This field is returned only for item groups.
  */
  'itemGroupHref': string;
  /**
  * Indicates the item group type. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc. Currently only SELLER_DEFINED_VARIATIONS is supported and indicates this is an item group created by the seller. Note: This field is returned only for item groups.
  */
  'itemGroupType': string;
  /**
  * The URI of the item. This field is always populated.
  */
  'itemHref': string;
  /**
  * The unique identifier of the item. For example: v1|150006693022|450002439078
  */
  'itemId': string;
  'itemLocation': ItemLocationImpl;
  /**
  * The URL to the View Item page of the item.
  */
  'itemWebUrl': string;
  'marketingPrice': MarketingPrice;
  /**
  * This container lists the local pickup options available to the buyer. This container is only returned if the user is searching for local pickup items and set the local pickup filters in the call request.
  */
  'pickupOptions': Array<PickupOptionSummary>;
  'price': ConvertedAmount;
  'seller': Seller0;
  /**
  * This container returns the shipping options available to ship the item.
  */
  'shippingOptions': Array<ShippingOptionSummary>;
  /**
  * This container is an array of thumbnail images for the item. For each image, the URL to the image is given.
  */
  'thumbnailImages': Array<Image>;
  /**
  * The seller-created title of the item. The maximum length is 80 characters.
  */
  'title': string;
  'unitPrice': ConvertedAmount;
  /**
  * The designation, such as size, weight, volume, count, etc., that was used to specify the quantity of the item. This helps buyers compare prices. For example, the following tells the buyer that the item is 7.99 per 100 grams. &quot;unitPricingMeasure&quot;: &quot;100g&quot;, &quot;unitPrice&quot;: { &nbsp;&nbsp;&quot;value&quot;: &quot;7.99&quot;, &nbsp;&nbsp;&quot;currency&quot;: &quot;GBP&quot;
  */
  'unitPricingMeasure': string;
}

/**
* The type that defines the details of an image, such as size and URL. Currently only <b> imageUrl</b> is populated. The <b> height</b> and <b> width</b> were added for future use.
*/
export class Image {
  /**
  * Reserved for future use.
  */
  'height': number;
  /**
  * The URL of the image of the item.
  */
  'imageUrl': string;
  /**
  * Reserved for future use.
  */
  'width': number;
}

/**
* The type that defines the fields for a monetary value and the conversion of the value into another currency.
*/
export class ConvertedAmount {
  /**
  * A three-letter ISO 4217 code that indicates the currency of the amount in the convertedFromValue field. This value is required or returned only if currency conversion/localization is required, and represents the pre-conversion currency. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CurrencyCodeEnum.html'>eBay API documentation</a>
  */
  'convertedFromCurrency': string;
  /**
  * The monetary amount before any conversion is performed, in the currency specified by the convertedFromCurrency field. This value is required or returned only if currency conversion/localization is required. The value field contains the converted amount of this value, in the currency specified by the currency field.
  */
  'convertedFromValue': string;
  /**
  * A three-letter ISO 4217 code that indicates the currency of the amount in the value field. If currency conversion/localization is required, this is the post-conversion currency of the amount in the value field. Default: The currency of the user's country. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CurrencyCodeEnum.html'>eBay API documentation</a>
  */
  'currency': string;
  /**
  * The dollar value of the currency specified in the currency field. The value of currency defaults to the standard currency used by the country of the eBay site offering the item.
  */
  'value': string;
}

/**
* This type is used by the <b> categories</b>  container in the response of the <b> search</b>  call, and consists of the primary listing category Id of the item (as well as secondary listing category if item was listed in two categories).
*/
export class Category {
  /**
  * The unique identifier of the primary listing category of the item (as well as secondary listing category if item was listed in two categories).
  */
  'categoryId': string;
}

/**
* The type that defines the fields for the distance between the item location and the buyer's location. 
*/
export class TargetLocation {
  /**
  * This value shows the unit of measurement used to measure the distance between the location of the item and the buyer's location. This value is typically mi or km.
  */
  'unitOfMeasure': string;
  /**
  * This value indicates the distance (measured in the measurement unit in the unitOfMeasure field) between the item location and the buyer's location.
  */
  'value': string;
}

/**
* This type is used by the <b> itemLocation</b>  container, which provides location information for the item.
*/
export class ItemLocationImpl {
  /**
  * The first line of the street address.
  */
  'addressLine1': string;
  /**
  * The second line of the street address. This field may contain such values as an apartment or suite number.
  */
  'addressLine2': string;
  /**
  * The city in which the item is located.
  */
  'city': string;
  /**
  * The country in which the item is located. These values are two-digit codes defined by the ISO 3166-1 alpha-2 standard, and also shown in the CountryCodeEnum type. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CountryCodeEnum.html'>eBay API documentation</a>
  */
  'country': string;
  /**
  * The county in which the item is located.
  */
  'county': string;
  /**
  * The postal code (or zip code in US) where the item is located.
  */
  'postalCode': string;
  /**
  * The state or province in which the item is located.
  */
  'stateOrProvince': string;
}

/**
* The type that defines the fields that describe a seller discount.
*/
export class MarketingPrice {
  'discountAmount': ConvertedAmount;
  /**
  * This field expresses the percentage of the seller discount based on the value in the originalPrice container.
  */
  'discountPercentage': string;
  'originalPrice': ConvertedAmount;
}

/**
* The type that defines the fields for the local pickup options that are available for the item. It is used by the <b>  pickupOptions</b>  container.
*/
export class PickupOptionSummary {
  /**
  * This container returns the local pickup options available to the buyer. Possible values are ARRANGED_LOCATION and STORE.
  */
  'pickupLocationType': string;
}


/**
* The type that defines the fields for basic information about the seller of the item returned by the <b> item_summary</b> resource.
*/
export class Seller0 {
  /**
  * The percentage of the total positive feedback.
  */
  'feedbackPercentage': string;
  /**
  * The feedback score of the seller. This value is based on the ratings from eBay members that bought items from this seller.
  */
  'feedbackScore': number;
  /**
  * Indicates if the seller is a business or an individual. This is determined when the seller registers with eBay. If they register for a business account, this value will be BUSINESS. If they register for a private account, this value will be INDIVIDUAL. This designation is required by the tax laws in some countries. This field is returned only on the following sites. This field is returned only on the following sites. EBAY-AT &nbsp;&nbsp;&nbsp;EBAY-BE &nbsp;&nbsp;&nbsp;EBAY-CH &nbsp;&nbsp;&nbsp;EBAY-DE &nbsp;&nbsp;&nbsp;EBAY-ES &nbsp;&nbsp;&nbsp;EBAY-FR &nbsp;&nbsp;&nbsp;EBAY-GB &nbsp;&nbsp;&nbsp;EBAY-IE &nbsp;&nbsp;&nbsp; EBAY-IT &nbsp;&nbsp;&nbsp;EBAY-PL Valid values: BUSINESS INDIVIDUALCode so that your app gracefully handles any future changes to this list.
  */
  'sellerAccountType': string;
  /**
  * The user name created by the seller for use on eBay.
  */
  'username': string;
}

/**
* The type that defines the fields for the shipping information.
*/
export class ShippingOptionSummary {
  /**
  * The end date of the delivery window (latest projected delivery date). This value is returned in UTC format (yyyy-MM-ddThh:mm:ss.sssZ), which you can convert into the local time of the buyer. Note: For the best accuracy, always include the contextualLocation values in the X-EBAY-C-ENDUSERCTX request header.
  */
  'maxEstimatedDeliveryDate': string;
  /**
  * The start date of the delivery window (earliest projected delivery date). This value is returned in UTC format (yyyy-MM-ddThh:mm:ss.sssZ), which you can convert into the local time of the buyer. Note: For the best accuracy, always include the contextualLocation values in the X-EBAY-C-ENDUSERCTX request header.
  */
  'minEstimatedDeliveryDate': string;
  'shippingCost': ConvertedAmount;
  /**
  * This field indicates the type of shipping used to ship the item. Possible values are FIXED (flat-rate shipping) and CALCULATED (calculated shipping).
  */
  'shippingCostType': string;
}

/**
* The type that defines the settings that paginate the result sets. The response consists of 0 or more sequenced <em> result sets</em> where each result sets has 0 or more items. 
*/
export class SearchPagedCollection {
  /**
  * The URI of the current result set. For example: https://api.ebay.com/buy/v1/item/search?q=shirt&amp;price=[20..80]&amp;limit=5 This query is for a shirt, that is priced between 20 and 80 dollars and limit the response to 5 items.
  */
  'href': string;
  /**
  * An array of items in one result set. The items are sorted according to the sorting method specified in the request.
  */
  'itemSummaries': Array<ItemSummary>;
  /**
  * The maximum number of items that can be returned in a result set. The limit value is set in the request.
  */
  'limit': number;
  /**
  * The URL for the next result set. This is returned if there is a next result set. The following example returns items 11 thru 20 from the list of items. https://api.ebay.com/buy/v1/item/search?query=t-shirts&amp;limit=10&amp;offset=0
  */
  'next': string;
  /**
  * This value indicates the current 'page' of items being displayed. This value is 0 for the first page of data, 1 for the second page of data, and so on.
  */
  'offset': number;
  /**
  * The URL for the previous result set. This is returned if there is a previous result set. The following example returns items 1 thru 10 from the list of items. https://api.ebay.com/buy/v1/item/search?query=t-shirts&amp;limit=10&amp;offset=0
  */
  'prev': string;
  'refinement': any; // <- I removed the actual type here to avoid bringing in dozens of types.
  /**
  * The total number of items that match the input criteria.
  */
  'total': number;
  /**
  * The container with all the warnings for the input request.
  */
  'warnings': Array<ModelError>;
}

/**
* The type that defines the fields that can be returned in an error.
*/
export class ModelError {
  /**
  * This string value indicates the error category. There are three categories of errors: request errors, application errors, and system errors.
  */
  'category': string;
  /**
  * The name of the primary system where the error occurred. This is relevant for application errors.
  */
  'domain': string;
  /**
  * A unique code that identifies the particular error or warning that occurred. Your application can use error codes as identifiers in your customized error-handling algorithms.
  */
  'errorId': number;
  /**
  * An array of reference Ids that identify the specific request elements most closely associated to the error or warning, if any.
  */
  'inputRefIds': Array<string>;
  /**
  * A detailed description of the condition that caused the error or warning, and information on what to do to correct the problem.
  */
  'longMessage': string;
  /**
  * A description of the condition that caused the error or warning.
  */
  'message': string;
  /**
  * An array of reference Ids that identify the specific response elements most closely associated to the error or warning, if any.
  */
  'outputRefIds': Array<string>;
  /**
  * An array of warning and error messages that return one or more variables contextual information about the error or warning. This is often the field or value that triggered the error or warning.
  */
  'parameters': Array<ErrorParameter>;
  /**
  * The name of the subdomain in which the error or warning occurred.
  */
  'subdomain': string;
}

/**
* An array of name/value pairs that provide more details regarding error condition.
*/
export class ErrorParameter {
  /**
  * This is the name of input field that caused an issue with the call request.
  */
  'name': string;
  /**
  * This is the actual value that was passed in for the element specified in the name field.
  */
  'value': string;
}