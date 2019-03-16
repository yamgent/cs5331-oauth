const crypto = require('crypto');

const savedAccessTokens = [];

const create = (userId, clientId, scope, ttl, cb) => {
    const accessToken = crypto.randomBytes(32).toString('hex');

    const tokenEntry = { userId, clientId, scope, accessToken, ttl };
    savedAccessTokens.push(tokenEntry);

    return cb(null, accessToken);
}

const fetchByToken = (token) => {
    for (const t of savedAccessTokens) {
        if (t.accessToken === token) {
            return t;
        }
    }

    return null;
};

const install = (oauth2) => {
    oauth2.model.accessToken.create = create;
    oauth2.model.accessToken.fetchByToken = fetchByToken;
};

module.exports = { install };
