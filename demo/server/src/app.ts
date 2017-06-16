'use strict';

// import PassportAuthImpl from '@raincatcher/passport-auth';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as path from 'path';
import * as favicon from 'serve-favicon';
// import * as passport from 'passport';
// import {Strategy} from 'passport-local';
// import users, {User} from './userSeed';
import EnvironmentConfig, { CloudAppConfig, Config } from './util/config';

const app: express.Express = express();
const appConfig: Config<CloudAppConfig> = new EnvironmentConfig<CloudAppConfig>();
const config = appConfig.getConfig();
// const authService = new PassportAuthImpl<User>();

app.use(logger(config.morganOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'test', resave: false, saveUninitialized: false}));
// authService.init(app);
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

// app.use('/', index);

app.use((req: express.Request, res: express.Response, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// //passport config
// authService.setSerializeFunction(function(user: User, done: Function) {
//   done(null, user.id);
// });
//
// authService.setDeserializeFunction(function(id: string, done: Function) {
//   users.forEach(function(user) {
//     if (user.id === id) {
//       const userObj = {
//         username: user.username,
//         name: user.name,
//         position: user.position,
//         email: user.email,
//         phone: user.phone,
//         avatar: user.avatar,
//         banner: user.banner,
//         notes: user.notes
//       };
//       done(null, userObj);
//     }
//   });
// });
//
// authService.setStrategy(function(username: string, password: string, done: Function) {
//   const user = users.map(function(user) {return user.username; }).indexOf(username);
//
//   if (users[user] && users[user].password === password) {
//     return done(null, users[user]);
//   } else {
//     return done(null, false);
//   }
// });

// //passport config
// passport.serializeUser((user: User, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser((id: string, done) => {
//   users.forEach(function(user) {
//     if(user.id === id) {
//       let userObj = {
//         username: user.username,
//         name: user.name,
//         position: user.position,
//         email: user.email,
//         phone: user.phone,
//         avatar: user.avatar,
//         banner: user.banner,
//         notes: user.notes
//
//       };
//       done(null, userObj);
//     }
//   });
// });
// //Configure passport strategy using passport-local strategy
// //Use userSeed as data
// passport.use(new Strategy(function(username, password, done) {
//   let user = users.map(function(user) {return user.username}).indexOf(username);
//
//   if(users[user] && users[user].password === password) {
//     return done(null, users[user]);
//   } else {
//     return done(null, false);
//   }
// }));

let errHandler: express.ErrorRequestHandler;

errHandler = (err: any, req: express.Request, res: express.Response, next: () => void) => {
  res.status(err.status || 500);
  res.render('error', {
    title: 'error',
    message: err.message,
    error: config.logStackTraces ? err : {}
  });
};

app.use(errHandler);
export default app;
