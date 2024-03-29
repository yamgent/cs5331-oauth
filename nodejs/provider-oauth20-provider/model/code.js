const crypto = require('crypto');

const savedCodes = [];

const createCodeForUserWithClient = (userId, clientId, scope, ttl, callback) => {
    var code = crypto.randomBytes(32).toString('hex');

    // save codes so that relying party can verify with us
    const newCode = { code, userId, clientId, scope, ttl, endtime: new Date().getTime() + ttl * 1000, claimed: false };
    savedCodes.push(newCode);

    callback(null, code);
};

const fetchByCode = (code, callback) => {
    for (const c of savedCodes) {
        if (c.code === code && !c.claimed) {
            return callback(null, c);
        }
    }

    return callback();
};

const getClientId = (code) => {
    return code.clientId;
}

const checkTTL = (code) => {
    return !code.claimed && code.endtime > new Date().getTime();
}

const getUserId = (code) => {
    return code.userId;
}

const getScope = (code) => {
    return code.scope;
}

// this means that the code is removed once an access token is given
const removeByCode = (code, callback) => {
    for (const c of savedCodes) {
        if (c.code === code) {
            c.claimed = true;
            return callback(null);
        }
    }
    return callback("Failed to delete code");
}

const install = (oauth2) => {
    oauth2.model.code.create = createCodeForUserWithClient;
    oauth2.model.code.fetchByCode = fetchByCode;
    oauth2.model.code.getClientId = getClientId;
    oauth2.model.code.checkTTL = checkTTL;
    oauth2.model.code.getUserId = getUserId;
    oauth2.model.code.getScope = getScope;
    oauth2.model.code.removeByCode = removeByCode;
};

module.exports = { install };
