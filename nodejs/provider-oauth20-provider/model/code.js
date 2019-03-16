const crypto = require('crypto');

const savedCodes = [];

const codeAliveDurationMs = 60 * 60 * 1000;

const createCodeForUserWithClient = (userId, clientId, scope, ttl, callback) => {
    var code = crypto.randomBytes(32).toString('hex');

    // save codes so that relying party can verify with us
    const newCode = { code, userId, clientId, scope, ttl: new Date().getTime() + codeAliveDurationMs};
    console.log(newCode);
    savedCodes.push(newCode);

    callback(null, code);
};

const install = (oauth2) => {
    oauth2.model.code.create = createCodeForUserWithClient;
};

module.exports = { install };
