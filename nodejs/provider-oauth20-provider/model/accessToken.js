const crypto = require('crypto');

const savedAccessTokens = [];

const create = (userId, clientId, scope, ttl, cb) => {
    const accessToken = crypto.randomBytes(32).toString('hex');

    const tokenEntry = { userId, clientId, scope, accessToken, ttl };
    savedAccessTokens.push(tokenEntry);

    return cb(null, accessToken);
}

const install = (oauth2) => {
    oauth2.model.accessToken.create = create;
};

module.exports = { install };
