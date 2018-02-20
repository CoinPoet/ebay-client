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

/**
* Type that defines the fields for the item details for a specific item.
*/
export class Item {
  /**
  * An array of containers with the URLs for the images that are in addition to the primary image. The primary image is returned in the image.imageUrl field.
  */
  'additionalImages': Array<Image>;
  /**
  * This indicates if the item is for adults only. For more information about adult-only items on eBay, see Adult items policy for sellers and Searching for adult only items for buyers.
  */
  'adultOnly': boolean;
  /**
  * (Primary Item Aspect) The age group for which the product is recommended. For example, newborn, infant, toddler, kids, adult, etc. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'ageGroup': string;
  /**
  * This integer value indicates the total number of bids that have been placed against an auction item. This field is returned only for auction listings.
  */
  'bidCount': number;
  /**
  * (Primary Item Aspect) The name brand of the item, such as Nike, Apple, etc. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'brand': string;
  /**
  * A list of purchase options available for the item, such as FIXED PRICE.
  */
  'buyingOptions': Array<string>;
  /**
  * The Id of the leaf category for this item. A left category is the lowest level in the category tree. This category has no children.
  */
  'categoryId': string;
  /**
  * Text that shows the category hierarchy of the item. For example: Computers/Tablets &amp; Networking, Laptops &amp; Netbooks, PC Laptops &amp; Netbooks
  */
  'categoryPath': string;
  /**
  * (Primary Item Aspect) Text describing the color of the item. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'color': string;
  /**
  * The name of the condition of the item, such as New or Used.
  */
  'condition': string;
  /**
  * The identifier of the condition. For example, 1000 is the identifier for NEW.
  */
  'conditionId': string;
  'currentBidPrice': ConvertedAmount;
  /**
  * The full description of the item that was created by the seller. This can be plain text or rich content.
  */
  'description': string;
  /**
  * Indicates the European energy efficiency rating (EEK) of the item. This field is returned only if the seller specified the energy efficiency rating. The rating is a set of energy efficiency classes from A to G, where 'A' is the most energy efficient and 'G' is the least efficient. This rating helps buyers choose between various models. When the manufacturer's specifications for this item are available, the link to this information is returned in the productFicheWebUrl field.
  */
  'energyEfficiencyClass': string;
  /**
  * An EPID is the eBay product identifier of a product from the eBay product catalog. This indicates the product in which the item belongs.
  */
  'epid': string;
  /**
  * The container that returns the item availability information. Because the quantity of an item can change several times within a few seconds, it is impossible to return the exact quantity. So instead of returning quantity, this returns the availability of the item based on the threshold the seller has set.
  */
  'estimatedAvailabilities': Array<EstimatedAvailability>;
  /**
  * (Primary Item Aspect) The gender for the item. This is used for items that could vary by gender, such as clothing. For example: male, female, or unisex. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'gender': string;
  /**
  * The unique Global Trade Item number of the item as defined by http://www.gtin.info. This can be a UPC (Universal Product Code), EAN (European Article Number), or an ISBN (International Standard Book Number) value.
  */
  'gtin': string;
  'image': Image;
  /**
  * The URL of the View Item page of the item, which includes the affiliate tracking Id. This field is only returned if the seller enables affiliate tracking for the listing by including the X-EBAY-C-ENDUSERCTX request header in the call.
  */
  'itemAffiliateWebUrl': string;
  /**
  * The date and time up to which the items can be purchased. This value is returned in UTC format (yyyy-MM-ddThh:mm:ss.sssZ), which you can convert into the local time of the buyer.
  */
  'itemEndDate': string;
  /**
  * The unique identifier of the item. Example: v1|150006693022|450002439078
  */
  'itemId': string;
  'itemLocation': Address;
  /**
  * The URL of the View Item page of the item.
  */
  'itemWebUrl': string;
  /**
  * An array of containers for the complete list of the name/value pairs that describe the variation of the item.
  */
  'localizedAspects': Array<TypedNameValue>;
  'marketingPrice': MarketingPrice;
  /**
  * (Primary Item Aspect) Text describing what the item is made of. For example, silk. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'material': string;
  /**
  * The manufacturer's part number, which is a unique number that identifies a specific product. To identify the product, this is always used along with brand.
  */
  'mpn': string;
  /**
  * (Primary Item Aspect) Text describing the pattern used on the item. For example, paisley. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'pattern': string;
  'price': ConvertedAmount;
  /**
  * This enumeration value indicates how item price is displayed. For some items, the prices are so low that they can only be shown to the buyer after they add the item to the cart. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/PriceDisplayConditionEnum.html'>eBay API documentation</a>
  */
  'priceDisplayCondition': string;
  'primaryItemGroup': ItemGroupSummary;
  'primaryProductReviewRating': ReviewRating;
  'product': Product;
  /**
  * The URL of a page containing the manufacture's specification of this item, which helps buyers make a purchasing decision. This information is available only for items that include the European energy efficiency rating (EEK) but is not available for all items with an EEK rating. This field is returned only if this information is available. The EEK rating of the item is returned in the energyEfficiencyClass field.
  */
  'productFicheWebUrl': string;
  /**
  * The maximum number for a specific item that one buyer can purchase.
  */
  'quantityLimitPerBuyer': number;
  'returnTerms': ItemReturnTerms;
  'seller': Seller;
  /**
  * An identifier generated/incremented when a seller revises the item. There are two types of item revisions; seller changes, such as changing the title, and eBay system changes, such as changing the quantity when an item is purchased. This Id is changed only when the seller makes a change to the item. This means you cannot use this value to determine if the quantity has changed.
  */
  'sellerItemRevision': string;
  /**
  * An array of shipping options containers that have the details about cost, carrier, etc. of one shipping option.
  */
  'shippingOptions': Array<ShippingOption>;
  'shipToLocations': ShipToLocations;
  /**
  * A snippet of the full description of the item in plain text.
  */
  'shortDescription': string;
  /**
  * (Primary Item Aspect) The size of the item. For example, '7' for a size 7 shoe. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'size': string;
  /**
  * (Primary Item Aspect) The sizing system of the country. All the item aspects, including this aspect, are returned in the localizedAspects container. Valid Values: &nbsp;&nbsp;US &nbsp;&nbsp;UK &nbsp;&nbsp;EU &nbsp;&nbsp;DE &nbsp;&nbsp;FR &nbsp;&nbsp;JP &nbsp;&nbsp;CN (China) &nbsp;&nbsp;IT &nbsp;&nbsp;BR &nbsp;&nbsp;MEX &nbsp;&nbsp;AU Code so that your app gracefully handles any future changes to this list.
  */
  'sizeSystem': string;
  /**
  * (Primary Item Aspect) Text describing a size group in which the item would be included, such as regular, petite, plus, big-and-tall or maternity. All the item aspects, including this aspect, are returned in the localizedAspects container.
  */
  'sizeType': string;
  /**
  * An additional shorten title for the item that is created by the seller.
  */
  'subtitle': string;
  /**
  * The container for the tax information for item.
  */
  'taxes': Array<Taxes>;
  /**
  * The seller-created title of the item.
  */
  'title': string;
  /**
  * Indicates if the item a top-rated plus item. There are three benefits of a top-rated plus item; a minimum 30-day money-back return policy, shipping the items in 1 business day with tracking provided, and the added comfort of knowing this item is from experienced sellers with the highest buyer ratings. See the Top Rated Plus Items and Becoming a Top Rated Seller and qualifying for Top Rated Plus help topics for more information.
  */
  'topRatedBuyingExperience': boolean;
  /**
  * This integer value indicates the number of different eBay users who have placed one or more bids on an auction item. This field is only applicable to auction listings.
  */
  'uniqueBidderCount': number;
  'unitPrice': ConvertedAmount;
  /**
  * The designation, such as size, weight, volume, count, etc., that was used to specify the quantity of the item. This helps buyers compare prices. For example, the following tells the buyer that the item is 7.99 per 100 grams. &quot;unitPricingMeasure&quot;: &quot;100g&quot;, &quot;unitPrice&quot;: { &nbsp;&nbsp;&quot;value&quot;: &quot;7.99&quot;, &nbsp;&nbsp;&quot;currency&quot;: &quot;GBP&quot;
  */
  'unitPricingMeasure': string;
  /**
  * An array of warning messages. These type of errors do not prevent the call from executing but should be checked.
  */
  'warnings': Array<ModelError>;
}


/**
* The type that defines the fields for the estimated item availability information.
*/
export class EstimatedAvailability {
  /**
  * The 'display item quantity' threshold value the seller has set.
  */
  'availabilityThreshold': number;
  /**
  * Only returns MORE_THAN, which indicates that the seller has more that the 'quantity display preference' value in stock for this item. This field depends on how the seller has set their item quantity display preference. Let's say the following are the quantity display preferences the seller can choose between. Display &quot;More than 10 available&quot; in your listing (if applicable) If the seller enables this preference, this field is returned as long as there are more than 10 in inventory of this item. If the quantity is equal to 10 or drops below 10, this field is not returned and the actual quantity of the item is returned in the estimatedAvailableQuantity field. Display the exact quantity in your listings If the seller enables this preference, the availabilityThresholdType field is not returned and the actual quantity of the item is returned in the estimatedAvailableQuantity field. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/AvailabilityThresholdEnum.html'>eBay API documentation</a>
  */
  'availabilityThresholdType': string;
  /**
  * An array of available delivery options.
  */
  'deliveryOptions': Array<string>;
  /**
  * Indicates the estimated availability of this item. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/AvailabilityStatusEnum.html'>eBay API documentation</a>
  */
  'estimatedAvailabilityStatus': string;
  /**
  * The estimated number of a specific item that are available for purchase.
  */
  'estimatedAvailableQuantity': number;
  /**
  * The estimated number of a specific item that have been sold.
  */
  'estimatedSoldQuantity': number;
}


/**
* The type that defines the tax fields.
*/
export class Taxes {
  /**
  * Indicates if tax was applied for the cost of the item.
  */
  'includedInPrice': boolean;
  /**
  * Indicates if tax is applied for the shipping cost.
  */
  'shippingAndHandlingTaxed': boolean;
  'taxJurisdiction': TaxJurisdiction;
  /**
  * The percentage of tax.
  */
  'taxPercentage': string;
  /**
  * Container that returns the tax type. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/TaxType.html'>eBay API documentation</a>
  */
  'taxType': string;
}


/**
* The type that defines the fields for the tax jurisdiction details.
*/
export class TaxJurisdiction {
  'region': Region;
  /**
  * The identifier of the tax jurisdiction.
  */
  'taxJurisdictionId': string;
}


/**
* The type that defines information for a region.
*/
export class Region {
  /**
  * A free-form text string that indicates the name of the region. This value can be the name of a world region (such as the &quot;Middle East&quot; or &quot;Southeast Asia&quot;), a country, or a domestic region within a country (such as &quot;Alaska/Hawaii&quot; or &quot;US Protectorates&quot;) depending on the value of regionType. This value should be WORLDWIDE if the regionType value is WORLDWIDE.
  */
  'regionName': string;
  /**
  * Indicates the type of region. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/RegionTypeEnum.html'>eBay API documentation</a>
  */
  'regionType': string;
}


/**
* The type that defines the fields that include and exclude geographic regions affecting where the item can be shipped. The seller defines these regions when listing the item.
*/
export class ShipToLocations {
  /**
  * A array of containers for regions that are specifically excluded from a region set. You can use this to exclude a specific regionName from a regionType that you specifically include.
  */
  'regionExcluded': Array<Region>;
  /**
  * A array of containers for regions that are specifically included in a region set. You can use this to exclude a specific regionName from a regionType that you specifically include.
  */
  'regionIncluded': Array<Region>;
}


/**
* The type that defines the fields for the details of a shipping provider.
*/
export class ShippingOption {
  'additionalShippingCostPerUnit': ConvertedAmount;
  /**
  * The deadline date that the item must be purchased by in order to be received by the buyer within the delivery window ( maxEstimatedDeliveryDate and minEstimatedDeliveryDate fields). This field is returned only for items that are eligible for 'Same Day Handling'. For these items, the value of this field is what is displayed in the Delivery line on the View Item page. This value is returned in UTC format (yyyy-MM-ddThh:mm:ss.sssZ), which you can convert into the local time of the buyer.
  */
  'cutOffDateUsedForEstimate': string;
  /**
  * The end date of the delivery window (latest projected delivery date). This value is returned in UTC format (yyyy-MM-ddThh:mm:ss.sssZ), which you can convert into the local time of the buyer. Note: For the best accuracy, always include the location of where the item is be shipped in the contextualLocation values of the X-EBAY-C-ENDUSERCTX request header.
  */
  'maxEstimatedDeliveryDate': string;
  /**
  * The start date of the delivery window (earliest projected delivery date). This value is returned in UTC format (yyyy-MM-ddThh:mm:ss.sssZ), which you can convert into the local time of the buyer. Note: For the best accuracy, always include the location of where the item is be shipped in the contextualLocation values of the X-EBAY-C-ENDUSERCTX request header.
  */
  'minEstimatedDeliveryDate': string;
  /**
  * The number of items used when calculating the estimation information.
  */
  'quantityUsedForEstimate': number;
  /**
  * A name of the shipping provider, such as FedEx, or USPS.
  */
  'shippingCarrierCode': string;
  'shippingCost': ConvertedAmount;
  /**
  * Indicates the class of the shipping cost. Valid Values: Flat or Calculated. Code so that your app gracefully handles any future changes to this list.
  */
  'shippingCostType': string;
  /**
  * The type of shipping service. For example, USPS First Class.
  */
  'shippingServiceCode': string;
  'shipToLocationUsedForEstimate': ShipToLocation;
  /**
  * Any trademark symbol, such as &trade; or &reg;, that needs to be shown in superscript next to the shipping service name.
  */
  'trademarkSymbol': string;
  /**
  * The type of a shipping option, such as EXPEDITED, ONE_DAY, STANDARD, ECONOMY, PICKUP, etc.
  */
  'type': string;
}


/**
* The type that defines the fields for the country and postal code of where an item is to be shipped.
*/
export class ShipToLocation {
  /**
  * The three-letter ISO 3166-1 standard of the country for where the item is to be shipped. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CountryCodeEnum.html'>eBay API documentation</a>
  */
  'country': string;
  /**
  * The zip code (postal code) for where the item is to be shipped.
  */
  'postalCode': string;
}


/**
* The type that defines the fields for an address.
*/
export class Address {
  /**
  * The first line of the street address.
  */
  'addressLine1': string;
  /**
  * The second line of the street address. This field is not always used, but can be used for 'Suite Number' or 'Apt Number'.
  */
  'addressLine2': string;
  /**
  * The city of the address.
  */
  'city': string;
  /**
  * The three-letter ISO 3166-1 standard of the country of the address. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CountryCodeEnum.html'>eBay API documentation</a>
  */
  'country': string;
  /**
  * The county of the address.
  */
  'county': string;
  /**
  * The postal code of the address.
  */
  'postalCode': string;
  /**
  * The state or province of the address.
  */
  'stateOrProvince': string;
}


/**
* The type that defines the fields for the name/value pairs for item aspects.
*/
export class TypedNameValue {
  /**
  * The text representing the name of the aspect for the name/value pair, such as Color.
  */
  'name': string;
  /**
  * Indicates if the value being returned is a string or an array of values. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/ValueTypeEnum.html'>eBay API documentation</a>
  */
  'type': string;
  /**
  * The value of the aspect for the name/value pair, such as Red.
  */
  'value': string;
}


/**
* The type that defines the fields for the details of each item in an item group. An item group is  an item that has various aspect differences, such as color, size, storage capacity, etc. When an item group is created, one of the item variations, such as the red shirt size L, is chosen as the \"parent\". All the other items in the group are the children, such as the blue shirt size L, red shirt size M, etc. <br /><br /><span class=\"tablenote\"><b> Note: </b> This container is returned only if the <b> item_id</b> in the request is an item group (parent Id of an item with variations).</span>
*/
export class ItemGroupSummary {
  /**
  * An array of containers with the URLs for images that are in addition to the primary image of the item group. The primary image is returned in the itemGroupImage field.
  */
  'itemGroupAdditionalImages': Array<Image>;
  /**
  * The HATEOAS reference of the parent page of the item group. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc.
  */
  'itemGroupHref': string;
  /**
  * The unique identifier for the item group. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc.
  */
  'itemGroupId': string;
  'itemGroupImage': Image;
  /**
  * The title of the item that appears on the item group page. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc.
  */
  'itemGroupTitle': string;
  /**
  * Indicates the type of the item group. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/ItemGroupTypeEnum.html'>eBay API documentation</a>
  */
  'itemGroupType': string;
}


/**
* The type that defines the fields for the rating of a product review.
*/
export class ReviewRating {
  /**
  * The average rating given to a product based on customer reviews.
  */
  'averageRating': string;
  /**
  * An array of containers for the product rating histograms that shows the review counts and the product rating.
  */
  'ratingHistograms': Array<RatingHistogram>;
  /**
  * The total number of reviews for the item.
  */
  'reviewCount': number;
}


/**
* The type that defines the fields for product ratings. Only products that are in the eBay product catalog can be reviewed and rated.
*/
export class RatingHistogram {
  /**
  * The total number of user ratings that the product has received.
  */
  'count': number;
  /**
  * This is the average rating for the product. As part of a product review, users rate the product. Products are rated from one star (terrible) to five stars (excellent), with each star having a corresponding point value - one star gets 1 point, two stars get 2 points, and so on. If a product had one four-star rating and one five-star rating, its average rating would be 4.5, and this is the value that would appear in this field.
  */
  'rating': string;
}


/**
* The type that defines the fields for the product information of the item.
*/
export class Product {
  /**
  * An array of containers with the URLs for the product images that are in addition to the primary image.
  */
  'additionalImages': Array<Image>;
  /**
  * A product can have more than one identifier value for a product type, such as UPC, EAN, etc. For example, the same product UPC can have an identifier that is 12, 13, or 14 digits. This container returns an array of all the product identifiers (type/value pairs) associated with the product. These are in addition to the identifiers returned in the mpn and gitn fields.
  */
  'additionalProductIdentities': Array<AdditionalProductIdentity>;
  /**
  * An array of containers for the product aspects. Each group contains the aspect group name and the aspect name/value pairs.
  */
  'aspectGroups': Array<AspectGroup>;
  /**
  * The brand associated with product. To identify the product, this is always used along with MPN (manufacturer part number).
  */
  'brand': string;
  /**
  * The rich description of an eBay product, which might contain HTML.
  */
  'description': string;
  /**
  * An array of all the possible GTINs values associated with the product. A GTIN is a unique Global Trade Item number of the item as defined by http://www.gtin.info. This can be a UPC (Universal Product Code), EAN (European Article Number), or an ISBN (International Standard Book Number) value.
  */
  'gtins': Array<string>;
  'image': Image;
  /**
  * An array of all possible MPN values associated with the product. A MPNs is manufacturer part number of the product. To identify the product, this is always used along with brand.
  */
  'mpns': Array<string>;
  /**
  * The title of the product.
  */
  'title': string;
}


/**
* The type that defines the array of additional product type/value pairs for the same product associated with an item. A product can have more than one identifier value for a product type, such as UPC or EAN. For example, the same product UPC can have an identifier that is 12, 13, or 14 digits. This container returns all the identifiers for each product Id type. These are in addition to the identifiers returned in the <b> mpn</b> and <b> gitn</b> fields. 
*/
export class AdditionalProductIdentity {
  /**
  * An array of additional type/value pairs for the same product associated with the item. For example: &nbsp;&nbsp;&nbsp;&quot;identifierType&quot;: &quot;UPC&quot;&nbsp;&nbsp;&nbsp;&nbsp; and &nbsp;&quot;identifierValue&quot;: &quot;0718908620489&quot; &nbsp;&nbsp;&nbsp;&quot;identifierType&quot;: &quot;UPC_12&quot;&nbsp; and &nbsp;&quot;identifierValue&quot;: &quot;718908620489&quot; &nbsp;&nbsp;&nbsp;&quot;identifierType&quot;: &quot;UPC_13&quot;&nbsp; and &nbsp;&quot;identifierValue&quot;: &quot;0718908620489&quot;
  */
  'productIdentity': Array<ProductIdentity>;
}


/**
* The type that defines the fields for the type/value pairs of product associated with an item. <br /><br />For example: <br />&nbsp;&nbsp;&nbsp;<code>\"identifierType\": \"BRAND\"</code> and  <code>\"identifierValue\": \"Apple\"</code><br />&nbsp;&nbsp;&nbsp;<code>\"identifierType\": \"MPN\"</code>, and <code>\"identifierValue\": \"MC978LLA\"<br />&nbsp;&nbsp;&nbsp;<code>\"identifierType\": \"UPC\" and \"identifierValue\": \"0885909470105\"</code>.
*/
export class ProductIdentity {
  /**
  * The type of the product identifier, such as UPC, ISBN, EAN, Brand, MPN, etc.
  */
  'identifierType': string;
  /**
  * The product identifier for the product associated with the item.
  */
  'identifierValue': string;
}


export class AspectGroup {
  /**
  * An array of the name/value pairs for the aspects of the product. For example: BRAND/Apple
  */
  'aspects': Array<Aspect>;
  /**
  * The name of a group of aspects. In the following example, Product Identifiers and Process are product aspect group names. Under the group name are the product aspect name/value pairs. Product Identifiers &nbsp;&nbsp;&nbsp;Brand/Apple &nbsp;&nbsp;&nbsp;Product Family/iMac Processor &nbsp;&nbsp;&nbsp;Processor Type/Intel &nbsp;&nbsp;&nbsp;Processor Speed/3.10
  */
  'localizedGroupName': string;
}


/**
* The type that defines the fields for the name/value pairs for the aspects of the product. For example: BRAND/Apple
*/
export class Aspect {
  /**
  * The text representing the name of the aspect for the name/value pair, such as Brand.
  */
  'localizedName': string;
  /**
  * The text representing the value of the aspect for the name/value pair, such as Apple.
  */
  'localizedValues': Array<string>;
}


/**
* The type that defines the fields for the seller's return policy.
*/
export class ItemReturnTerms {
  /**
  * Indicates if the seller has enabled the Extended Holiday Returns feature on the item. Extended Holiday Returns are only applicable during the US holiday season, and gives buyers extra time to return an item. This 'extra time' will typically extend beyond what is set through the returnPeriod value.
  */
  'extendedHolidayReturnsOffered': boolean;
  /**
  * This enumeration value indicates how a buyer is refunded when an item is returned. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/RefundMethodEnum.html'>eBay API documentation</a>
  */
  'refundMethod': string;
  /**
  * This string field indicates the restocking fee percentage that the seller has set on the item. Sellers have the option of setting no restocking fee for an item, or they can set the percentage to 10, 15, or 20 percent. So, if the cost of the item was $100, and the restocking percentage was 20 percent, the buyer would be charged $20 to return that item, so instead of receiving a $100 refund, they would received $80 due to the restocking fee.
  */
  'restockingFeePercentage': string;
  /**
  * Text written by the seller describing what the buyer should to do in order to return the item.
  */
  'returnInstructions': string;
  /**
  * This field is returned if the seller offers the buyer an item replacement or exchange instead of a monetary refund. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/ReturnMethodEnum.html'>eBay API documentation</a>
  */
  'returnMethod': string;
  'returnPeriod': TimeDuration;
  /**
  * Indicates whether or not the seller accepts returns for the item.
  */
  'returnsAccepted': boolean;
  /**
  * This enumeration value indicates whether the buyer or seller is responsible for return shipping costs when an item is returned. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/ReturnShippingCostPayerEnum.html'>eBay API documentation</a>
  */
  'returnShippingCostPayer': string;
}

/**
* The type that defines the fields for a period of time in the time-measurement units supplied.
*/
export class TimeDuration {
  /**
  * Retrieves the units (such as hours) of the time span.The enumeration value in this field defines the period of time being used to measure the duration, such as business days, months, or years. See the TimeDurationUnitEnum type for a list of possible time-measuring units. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/TimeDurationUnitEnum.html'>eBay API documentation</a>
  */
  'unit': string;
  /**
  * Retrieves the duration of the time span (no units).The value in this field indicates the number of years, months, days, hours, or minutes in the defined period.
  */
  'value': number;
}


/**
* The type that defines the fields for basic and detailed information about the seller of the item returned by the <b> item</b> resource.
*/
export class Seller {
  /**
  * The percentage of the total positive feedback.
  */
  'feedbackPercentage': string;
  /**
  * The feedback score of the seller. This value is based on the ratings from eBay members that bought items from this seller.
  */
  'feedbackScore': number;
  /**
  * Indicates if the seller is a business or an individual. This is determined when the seller registers with eBay. If they register for a business account, this value will be BUSINESS. If they register for a private account, this value will be INDIVIDUAL. This designation is required by the tax laws in some countries. This field is returned only on the following sites. EBAY-AT &nbsp;&nbsp;&nbsp;EBAY-BE &nbsp;&nbsp;&nbsp;EBAY-CH &nbsp;&nbsp;&nbsp;EBAY-DE &nbsp;&nbsp;&nbsp;EBAY-ES &nbsp;&nbsp;&nbsp;EBAY-FR &nbsp;&nbsp;&nbsp;EBAY-GB &nbsp;&nbsp;&nbsp;EBAY-IE &nbsp;&nbsp;&nbsp; EBAY-IT &nbsp;&nbsp;&nbsp;EBAY-PL Valid values: BUSINESS INDIVIDUALCode so that your app gracefully handles any future changes to this list.
  */
  'sellerAccountType': string;
  'sellerLegalInfo': SellerLegalInfo;
  /**
  * The user name created by the seller for use on eBay.
  */
  'username': string;
}


/**
* The type that defines the fields for the contact information for a seller.
*/
export class SellerLegalInfo {
  /**
  * The seller's business email address.
  */
  'email': string;
  /**
  * The seller' business fax number.
  */
  'fax': string;
  /**
  * This is a free-form string created by the seller. This is information often found on business cards, such as address. This is information used by some countries.
  */
  'imprint': string;
  /**
  * The seller's first name.
  */
  'legalContactFirstName': string;
  /**
  * The seller's last name.
  */
  'legalContactLastName': string;
  /**
  * The name of the seller's business.
  */
  'name': string;
  /**
  * The seller's business phone number.
  */
  'phone': string;
  /**
  * The seller's registration number. This is information used by some countries.
  */
  'registrationNumber': string;
  'sellerProvidedLegalAddress': LegalAddress;
  /**
  * This is a free-form string created by the seller. This is the seller's terms or condition, which is in addition to the seller's return policies.
  */
  'termsOfService': string;
  /**
  * An array of the seller's VAT (value added tax) Ids and the issuing country. VAT is a tax added by some European countries.
  */
  'vatDetails': Array<VatDetail>;
}


/**
* Type that defines the fields for the seller's address.
*/
export class LegalAddress {
  /**
  * The first line of the street address.
  */
  'addressLine1': string;
  /**
  * The second line of the street address. This field is not always used, but can be used for 'Suite Number' or 'Apt Number'.
  */
  'addressLine2': string;
  /**
  * The city of the address.
  */
  'city': string;
  /**
  * The three-letter ISO 3166-1 standard of the country of the address. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CountryCodeEnum.html'>eBay API documentation</a>
  */
  'country': string;
  /**
  * The name of the country of the address.
  */
  'countryName': string;
  /**
  * The name of the county of the address.
  */
  'county': string;
  /**
  * The postal code of the address.
  */
  'postalCode': string;
  /**
  * The state or province of the address.
  */
  'stateOrProvince': string;
}

/**
* The type the defines the fields for the VAT (value add tax) information.
*/
export class VatDetail {
  /**
  * The three-letter ISO 3166-1 standard of the country issuing the seller's VAT (value added tax) Id. VAT is a tax added by some European countries. For implementation help, refer to <a href='https://developer.ebay.com/devzone/rest/api-ref/browse/types/CountryCodeEnum.html'>eBay API documentation</a>
  */
  'issuingCountry': string;
  /**
  * The seller's VAT (value added tax) Id. VAT is a tax added by some European countries.
  */
  'vatId': string;
}