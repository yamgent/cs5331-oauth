const install = (oauth2) => {
    // for asking the user whether they want to grant a client access to their account
    oauth2.decision = (req, res, client, scope, user) => {
        res.render('decision', { user, client, model: req.oauth2.model, scope });
    };
};

module.exports = { install };
