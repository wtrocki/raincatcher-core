'use strict';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as expressHbs from 'express-handlebars';
import * as logger from 'morgan';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import { securityMiddleware, setupModules } from './modules';
import index from './user-routes/index';
import appConfig from './util/Config';

const app: express.Express = express();
const config = appConfig.getConfig();

/**
 * Function for setting CORS configuration. When using Passport as an auth service,
 * the credentials must be set to true.By doing this, the origin cannot be set to
 * '*'. Origin needs to be set to allow all origins for enabling cross-domain requests.
 *
 * @returns CORS configuration
 */
function getCorsConfig() {
  let corsConfig = {};
  if (!config.keycloakConfig) {
    const dynamicOrigin = function(origin, callback) {
      callback(null, true);
    };
    corsConfig = {
      origin: dynamicOrigin,
      credentials: true
    };
  }
  return corsConfig;
}

if (config.morganOptions) {
  app.use(logger(config.morganOptions));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(cors(getCorsConfig()));

app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');

setupModules(app);
app.use('/', index);

app.use((req: express.Request, res: express.Response, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

let errHandler: express.ErrorRequestHandler;

errHandler = (err: any, req: express.Request, res: express.Response, next: () => void) => {
  res.status(err.status || 500);
  res.json({
    title: 'error',
    message: err.message,
    error: config.logStackTraces ? err : {}
  });
};

app.use(errHandler);
export default app;
