const express = require('express');
const app = express();

const oauth2lib = require('oauth20-provider');
const oauth2 = new oauth2lib({log: { level: 'debug' }});

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');

const clientModel = require('./model/client');
const codeModel = require('./model/code');
const routes = require('./routes/routes');
const userModel = require('./model/user');
const controller = require('./controller/controller');

const port = 8000;
const sessionSecret = 'session.secret';

// set up oauth2 with our authorization logics
clientModel.install(oauth2);
codeModel.install(oauth2);
userModel.install(oauth2);
controller.install(oauth2);

// set up the rendering engine for our web pages
app.set('views', './views');
nunjucks.configure('views', { express: app });
app.set('view engine', 'html');

// inject oauth2 into our express server
app.use(oauth2.inject());

// inject session
app.use(session({ secret: 'sessionSecret', resave: false, saveUninitialized: false }));

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded type post data
app.use(bodyParser.urlencoded({ extended: true }));

// setup the server's routes
routes.setupRoutes(app, oauth2);

// start our server by listening to the correct port
app.listen(port, () => console.log(`Listening on http://localhost:${port} ...`));
