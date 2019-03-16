// Note: Clients are the relying parties

const registeredClients = [
    {
        id: 'id.abcmusicplayer', 
        name: 'ABC Music Player',
        secret: 'secret.abc',
        redirectUri: 'http://localhost:4000/',
        grant_types: ['authorization_code']
    }
];

const fetchById = (clientId, callback) => {
    for (const c of registeredClients) {
        if (c.id === clientId) {
            return callback(null, c);
        }
    }

    callback();
};

const getRedirectUri = (client) => {
    return client.redirectUri;
};

const getId = (client) => {
    return client.id;
};

const checkSecret = (client, secret, callback) => {
    return callback(null, client.secret === secret);
};

const checkGrantType = (client, type) => {
    return client.grant_types.includes(type);
}

const install = (oauth2) => {
    oauth2.model.client.fetchById = fetchById;
    oauth2.model.client.getRedirectUri = getRedirectUri;
    oauth2.model.client.getId = getId;
    oauth2.model.client.checkSecret = checkSecret;
    oauth2.model.client.checkGrantType = checkGrantType;
}

module.exports = { install };
