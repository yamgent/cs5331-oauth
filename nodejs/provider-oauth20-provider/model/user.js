// Note: Users are registered to the identity provider

const registeredUsers = [
    {
        id: 'id.johndoe', 
        name: 'John Doe',
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

const getId = (user) => {
    return user.id;
}

const install = (oauth2) => {
    oauth2.model.user.fetchFromRequest = fetchFromRequest;
    oauth2.model.user.getId = getId;
}

module.exports = { install };
