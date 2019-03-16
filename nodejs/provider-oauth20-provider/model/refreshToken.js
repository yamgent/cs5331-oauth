const removeByUserIdClientId = (userId, clientId, callback) => {
    // NOTE: not implemented because we don't use refresh token
    return callback();
};

const install = (oauth2) => {
    oauth2.model.refreshToken.removeByUserIdClientId = removeByUserIdClientId;
};

module.exports = { install };
