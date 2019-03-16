const login = require('../controller/login');

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
    
    app.get('/auth', login.checkUserLoggedIn, oauth2.controller.authorization);    
    app.post('/auth', login.checkUserLoggedIn, oauth2.controller.authorization);    
    app.post('/token', oauth2.controller.token);
};

module.exports = { setupRoutes };
