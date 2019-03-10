const crypto = require('crypto');

const createCodeForUserWithClient = (userId, clientId, scope, ttl, callback) => {
    var code = crypto.randomBytes(32).toString('hex');

    // TODO: Must save code somewhere!

    callback(null, code);
};

const install = (oauth2) => {
    oauth2.model.code.create = createCodeForUserWithClient;
};

module.exports = { install };
