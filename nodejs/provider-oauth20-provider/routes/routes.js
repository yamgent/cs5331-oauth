const setupRoutes = (app, oauth2) => {
    app.get('/', (req, res) => {
        res.render('index');
    });
    
    app.get('/login', (req, res) => {
        res.render('login');
    });
    
    app.get('/auth', oauth2.controller.authorization);    
    app.post('/auth', oauth2.controller.authorization);    
    app.post('/token', oauth2.controller.token);
};

module.exports = { setupRoutes };
