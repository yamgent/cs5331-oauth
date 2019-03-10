// Note: Clients are the relying parties

const registeredClients = [
    {
        id: 'id.abcmusicplayer', 
        name: 'ABC Music Player',
        secret: 'secret.abc',
        redirectUri: 'http://localhost:4000/'
    }
];

const fetchById = (clientId, callback) => {
    console.log(clientId);
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

const install = (oauth2) => {
    oauth2.model.client.fetchById = fetchById;
    oauth2.model.client.getRedirectUri = getRedirectUri;
    oauth2.model.client.getId = getId;
}

module.exports = { install };
