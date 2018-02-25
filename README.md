# coinpoet-ebay-client
[![npm version](https://badge.fury.io/js/coinpoet-ebay-client.svg)](https://badge.fury.io/js/coinpoet-ebay-client)
[![license](https://img.shields.io/npm/l/coinpoet-ebay-client.svg)](https://www.npmjs.com/package/coinpoet-ebay-client)
[![Build Status](https://travis-ci.org/CoinPoet/ebay-client.svg?branch=master)](https://travis-ci.org/CoinPoet/ebay-client)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a client for the eBay [RESTful APIs](https://developer.ebay.com/api-docs/static/ebay-rest-landing.html), especially the [buy API](https://go.developer.ebay.com/api-documentation#buy).

# Features & Benefits
* A thin wrapper around the eBay RESTful APIs. No magic here.
* Full type definitions via TypeScript with documentation from the eBay-provided YAML for intellisense and quick and accurate documentation.
* Manages tokens with each request.
* Tests included (these could be better)


# Usage
Install with `yarn add coinpoet-ebay-client`

Then you can use it as follows:
```
const config = {
  "baseURL": "https://api.ebay.com",
  "clientID": "<your ebay client id from developer.ebay.com>",
  "clientSecret": "<your ebay secret from developer.ebay.com>",
  "redirectUrlName": "<your ebay redirect url name from developer.ebay.com>"
}

const buyApi = new BuyApi(config)
for await (let item of buyApi.search({ category_ids: [123]})) {
  console.log(item)
}

// Alternatively get one page of results at a time (and not depend on async iterators which may not be available for your version of node - check http://node.green/#ES2018-features-Asynchronous-Iterators)
let pageResult = await buyApi.searchPage({ category_ids: [123], offset, limit })
```

# Contributing
Please submit pull requests (with tests passing in the build).
