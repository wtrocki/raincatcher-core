# RainCatcher Sync Cloud

Raincatcher Wrapper for Feedhenry DataSync server
This module creates server side service that allows
mobile applications to sync offline data to preferred database. By default server connects and stores all client data in mongodb database. This behavior can be changed by providing custom handlers.

For advanced usage see FeedHenry sync documentation:
https://github.com/feedhenry/fh-sync/docs

> **Note**: Cloud service is utilized by one of the sync clients. For more information about client go to: https://github.com/feedhenry/fh-sync-js

## Quick start

1. Start sync service process
Starting sync service that will monitor and process
new tasks that are sent from sync clients

```typescript
    import SyncServer, { SyncApi, SyncOptions, SyncExpressMiddleWare } from '../src/index'
    // Create api object
    const sync: SyncApi = new SyncServer();
    // Options for sync connection
    const connectOptions: SyncOptions = {},
    // Connect database and start sync
    sync.connect(connectOptions, function (err) {
      if (err) {
        console.log(err);
      }
    })
```

2. Create api endpoint for sync.

This endpoint will be called by all clients that wish to synchronize their local data with server.

```typescript
//middleware
app.use(bodyParser.json());
app.use(cors());

// Use api path of your wish
// Same endpoint needs to be configured in js client
const path = '/sync/:datasetId';
const middleware: SyncExpressMiddleWare = new
SyncExpressMiddleWare();

const router = middleware.createSyncExpressRouter();
app.use(router);
```

See [integration](./integration) for complete runnable example.

## Custom data handlers

By default sync will use the same mongodb connection for retrieving and storing any client data. Sync allows to modify this behavior by providing custom `DataSetHandler`

1. Create `DataSetHandler`

```typescript
class MySQLDataSetHandler implements DataSetHandler {
  // We can implement any any method we wish
  onList(datasetId: string, query: any, metaData: any, callback: (err: Error | string | undefined, res: any | undefined) => void) {
    let taskList = mysqlTaskRepository.getTasks(query);
    callback(undefined, taskList);
  }
}

sync.registerDatasetDataHandler("task", options, new MySQLDataSetHandler());
```

2. Add handler

## Accessing underlying sync library

For advanced use cases developers can access sync library using `NativeSync` namespace.
Library is shipped with their own typings. You can import this directly into your application as bellow:

```typescript
import { NativeSync } from '../src/index'
NativeSync.api.anyapicall ;
```

Where `anyapicall` is one of the types defined in:
https://github.com/feedhenry/fh-sync/blob/master/types/fh-sync.d.ts

For more advanced usages please follow documentation: https://github.com/feedhenry/fh-sync/docs
