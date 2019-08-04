# ISSUE
https://github.com/angular/universal/issues/1169#issuecomment-515274474
```
> node dist/server

internal/modules/cjs/loader.js:638
    throw err;
    ^

Error: Cannot find module 'require("./server/main")'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
    at Module.require (internal/modules/cjs/loader.js:690:17)
    at require (internal/modules/cjs/helpers.js:25:18)
```

## Repro steps:
- `build:ssr`
- `npm run serve:ssr`

## What's causing the issue
`libraryTarget: 'commonjs2'` in the `webpack.server.config.js` file, that is being used to make `app` "importable" from the outside, (i.e., using aws lambda)
```
const awsServerlessExpress = require('aws-serverless-express');
const server = require('./dist/server');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const binaryMimeTypes = [
...
];

server.app.use(awsServerlessExpressMiddleware.eventContext());

const serverProxy = awsServerlessExpress.createServer(
  server.app,
  null,
  binaryMimeTypes
);
module.exports.universal = (event, context) =>
  awsServerlessExpress.proxy(serverProxy, event, context);
```
