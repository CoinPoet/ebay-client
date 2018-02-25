

# Todo?
+ Ensure everything is tested in offline mode without requiring sandbox requests.
+ Setup travisci build
+ Finalize readme
+ LICENSE (file)
+ push NPM package
- support exponential backoff
- Replace httpRequestImpl with an injected object that handles the mock responses rather than using globals to specify the mock request data. Something like the following:
```
  let cl = client.build(mockHttpRequestImpl, loggerImpl, LOG_LEVEL)
  let buyApi = cl.buildBuyApi()
```
- lint w/ standard (standard+typescript is a pia though) - https://github.com/blakeembrey/tslint-config-standard ?
- Maybe use standard fetch API instead of httpRequest lib.


# Implementation Notes / Horror Stories
- Using typescript because it has support for async generators and they're awesome. 
  - Not that anything else supports them. In hindsight this was a mistake until node v10. Webpack is fragile and complex magic and typescript's module emitting options + webpack + mocha+ts-node is a terrible waste of time. I would rather have just written pure ES6 and dealt with a manual iteration of some kind instead.
  - Note to self; I never regretted writing pure ES6 (even when transpiling is required) and always regret writing TypeScript.
- Using pkg.module because https://github.com/rollup/rollup/wiki/pkg.module
  - I knew this was idealistic, but it was (combined with the above) terribly complex to get right and eventually disabled it. It seems everything on node assumes CJS (e.g. mocha+ts-node!) and it's terrible added complexity. 
