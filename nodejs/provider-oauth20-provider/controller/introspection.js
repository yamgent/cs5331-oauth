const getUserClientId = (oauth2, accessToken) => {
    const result = oauth2.model.accessToken.fetchByToken(accessToken);
    if (result === null) {
        return { userId: '', clientId: '' };
    }

    return { userId: result.userId, clientId: result.clientId };
};

module.exports = { getUserClientId };
