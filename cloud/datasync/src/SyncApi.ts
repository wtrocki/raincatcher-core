import SyncOptions from './options/SyncGlobalOptions';
import SyncDatasetOptions from './options/SyncDatasetOptions';
import DataSetHandler from './crud-handlers/DataSetHandler'

/**
 * Interface for offline data sync solutions
 */
export interface SyncApi {

  /**
   * Connect sync service to database and cache servers. Setup middleware required to process sync calls from clients.
   * Method will If you wish to use sync with default data handlers and options that are passed from client app
   */
  connect(options: SyncOptions, callback: (err: any) => void): void;

  /**
   * Allows to override default data handlers to store/retrieve data for all datasets
   * 
   * @param dataHandler - implementation DataSetHandler 
   */
  setGlobalDataHandlers(dataHandler: DataSetHandler): void;

  /**
   * Register dataset to be monitored by sync with particular data handlers
   */
  registerDatasetDataHandler(datasetId: string, options: SyncDatasetOptions, dataHandler?: DataSetHandler): void;
}

export default SyncApi;