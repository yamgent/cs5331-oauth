const loginUser = (req, res, oauth2) => {
    const userId = req.body.loginuser;
    const password = req.body.loginpassword;

    if (req.session.authorized) {
        // already logged in
        res.redirect('/');  // TODO: Better redirect (should redirect to /auth)
    }

    oauth2.model.user.checkPassword(userId, password, (errorMessage, correct) => {
        if (!correct) {
            res.render('loginFail');
        } else {
            req.session.user = userId;
            req.session.authorized = true;
            res.redirect('/');  // TODO: Better redirect (should redirect to /auth)
        }
    });
};

const checkUserLoggedIn = (req, res, next) => {
    if (req.session && req.session.authorized) 
        next();
    else {
        res.redirect('/login');
    }
};

const getLoggedInUserFullName = (req, oauth2) => {
    if (req.session && req.session.authorized) {
        const user = oauth2.model.user.fetchFromRequest(req);
        console.log(user);
        return user !== null ? user.name : '';
    } else {
        return '';
    }
};

module.exports = { loginUser, checkUserLoggedIn, getLoggedInUserFullName };
