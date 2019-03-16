const loginUser = (req, res, oauth2) => {
    const userId = req.body.loginuser;
    const password = req.body.loginpassword;

    // in case returnUri is malicious
    delete req.body.loginuser;
    delete req.body.loginpassword;

    let returnUri = req.session.loginReturnUri || '/';
    req.session.loginReturnUri = '';

    if (req.session.authorized) {
        // already logged in
        res.redirect(returnUri);
    }

    oauth2.model.user.checkPassword(userId, password, (errorMessage, correct) => {
        if (!correct) {
            res.render('loginFail');
        } else {
            req.session.user = userId;
            req.session.authorized = true;
            res.redirect(returnUri);
        }
    });
};

const checkUserLoggedIn = (req, res, next) => {
    req.session.loginReturnUri = '';
    
    if (req.session && req.session.authorized) 
        next();
    else {
        req.session.loginReturnUri = req.originalUrl;
        res.redirect(`/login`);
    }
};

const getLoggedInUserFullName = (req, oauth2) => {
    if (req.session && req.session.authorized) {
        const user = oauth2.model.user.fetchFromRequest(req);
        return user !== null ? user.name : '';
    } else {
        return '';
    }
};

const logoutUser = (req, res) => {
    req.session.user = '';
    req.session.authorized = false;
    res.redirect('/'); 
}

module.exports = { loginUser, checkUserLoggedIn, getLoggedInUserFullName, logoutUser };
