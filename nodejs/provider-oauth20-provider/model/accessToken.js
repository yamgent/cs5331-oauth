const savedTokens = [];

const create = (userId, clientId, scope, ttl, cb) => {
    const token = { userId, clientId, scope, ttl };
    savedTokens.push(token);
    return cb(null, token);
}

const install = (oauth2) => {
    oauth2.model.accessToken.create = create;
};

module.exports = { install };
