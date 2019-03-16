const login = require('../controller/login');
const introspection = require('../controller/introspection');

const setupRoutes = (app, oauth2) => {
    app.get('/', (req, res) => {
        res.render('index', { userFullName: login.getLoggedInUserFullName(req, oauth2) });
    });
    
    app.get('/login', (req, res) => {
        res.render('login');
    });
    app.post('/login', (req, res) => {
        login.loginUser(req, res, oauth2);
    });

    app.post('/logout', login.logoutUser);
    
    app.get('/auth', login.checkUserLoggedIn, oauth2.controller.authorization);    
    app.post('/auth', login.checkUserLoggedIn, oauth2.controller.authorization);    
    app.post('/token', oauth2.controller.token);

    app.post('/introspection', (req, res) => {
        res.end(JSON.stringify(introspection.getUserClientId(oauth2, req.body.access_token)));
    });
};

module.exports = { setupRoutes };
