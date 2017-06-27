import SyncServer, { SyncApi, SyncExpressMiddleWare, SyncOptions } from '../src/index';

const sync: SyncApi = SyncServer;

// Connect sync
const connectOptions: SyncOptions = {
  datasetConfiguration: {
    mongoDbConnectionUrl: process.env.MONGO_CONNECTION_URL || 'mongodb://127.0.0.1:27017/sync',
    mongoDbOptions: {},
    redisConnectionUrl: process.env.REDIS_CONNECTION_URL || 'redis://127.0.0.1:6379'
  },
  globalSyncOptions: { useCache: false }
};

sync.connect(connectOptions, function(err) {
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
});

// Create express middleware
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const middleware: SyncExpressMiddleWare = new SyncExpressMiddleWare('/sync/:datasetId');
const router = middleware.createSyncExpressRouter();
app.use('/', router);

import { NativeSync } from '../src/index';
// NativeSync.api.globalHandleList;

app.listen(3000, function() {
  // tslint:disable-next-line:no-console
  console.log('Example app listening on port 3000!');
});
// If you wish to see logs;
process.env.DEBUG = 'fh-mbaas-api:sync';
