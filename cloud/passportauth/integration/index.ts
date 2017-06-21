import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {passport, PassportAuth, PassportSetup, UserApiService, UserSecService} from '../src/index';
import {UserDataRepository} from './UserDataRepository';
import userSeedData, {User} from './UserSeedData';

// Configuration for session options
const sessionOpts = {
  secret: process.env.SESSION_SECRET || 'wfm',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    path: '/'
  }
};

// Initialize user data repository and passport
const userRepo = new UserDataRepository(userSeedData);
const userApi = new UserApiService<User>(userRepo);
const userSec = new UserSecService<User>(userApi);
const passportSetup = new PassportSetup<User>(userSec);
const authService = new PassportAuth<User>(userSec);
const app = express();

app.use(bodyParser.json());
app.use(cors());
passportSetup.init(app, sessionOpts);

app.get('/testAdminEndpoint', authService.protect('admin'), (req: express.Request, res: express.Response) => {
  res.json({routeName: '/testAdminEndpoint', msg: 'authorized to access admin endpoint'});
});

app.get('/testUserEndpoint', authService.protect('user'), (req: express.Request, res: express.Response) => {
  res.json({routeName: '/testUserEndpoint', msg: 'authorized to access user route'});
});

app.get('/login', (req: express.Request, res: express.Response) => {
  // TODO: Integrate login page from demo app -- Use handlebars
  res.json({routeName: '/login', msg: 'You need to login'});
});

app.post('/login', passport.authenticate('local', {successReturnToOrRedirect: '/testAdminEndpoint'}));

app.listen(3000, function() {
  console.log('Example auth app listening on port 3000');
});
