// Note: Users are registered to the identity provider

const registeredUsers = [
    {
        id: 'id.johndoe',
        name: 'John Doe',
        password: 'johndoe'
    }
];

const fetchFromRequest = (request) => {
    // usually logged in user will be saved in 'request.session'
    // now let just simulate that we have already logged in
    const userId = 'id.johndoe';

    for (const u of registeredUsers) {
        if (u.id === userId) {
            return u;
        }
    }

    return null;
};

const checkPassword = (user, password, callback) => {
    for (const u of registeredUsers) {
        if (u.id === user && u.password) {
            return callback(null, true);
        }
    }
    callback(null, false);
}

const getId = (user) => {
    return user.id;
}

const install = (oauth2) => {
    oauth2.model.user.fetchFromRequest = fetchFromRequest;
    oauth2.model.user.getId = getId;
    oauth2.model.user.checkPassword = checkPassword;
}

module.exports = { install };
