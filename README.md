# cs5331-oauth
CS5331 Web Security: OAuth

The identity service provider is located in `nodejs/provider-oauth20-provider`. All
commands are presumed to be executed in that folder.

## Setup

1. Install node.js.
2. Clone this repository.
3. 

```
npm install
```

## Run Server

```
node index.js
```

## Endpoints

Ensure that you at least follow the format of OAuth when invoking the endpoints, otherwise
nothing will work (an informative description of the format can be found in articles such
as [this](https://connect2id.com/products/server/docs/api/token)).

See `index.html` for a demonstration of how the endpoints can be invoked.

### Authorization

```
GET /auth?redirect_uri=***&client_id=***&response_type=code
```

Example:
```
GET /auth?redirect_uri=http://localhost:4000/&client_id=id.abcmusicplayer&response_type=code
```

### Token

```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic *************

grant_type=authorization_code&code=***&redirect_uri=***
```

Example:
```
POST /token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic aWQuYWJjbXVzaWNwbGF5ZXI6c2VjcmV0LmFiYw==

grant_type=authorization_code&code=58d9b11dba2f6bae7651b840270ee76f817bcd9414aeff07cc6481d380a1934b&redirect_uri=http://localhost:4000/
```

### Introspection

```
POST /introspection

access_token=***
```

Example:

```
POST /introspection

access_token=61851d15212770e59156942eceb48b6d949d58811ebbc849405622c0126cfb89
```

## Current Settings

### Users

The current user registered in the identity provider is "John Doe". 
His username is `id.johndoe` and his password is `johndoe`.

You can add more users in [user.js](https://github.com/yamgent/cs5331-oauth/blob/master/nodejs/provider-oauth20-provider/model/user.js).

### Clients/Relying Party

The current application registered to the identity provider is "ABC Music Player".
Its client id is `id.abcmusicplayer`, and its secret is `secret.abc`.

We assume that the website of "ABC Music Player" is at `localhost:4000`.

You can add more relying parties in [client.js](https://github.com/yamgent/cs5331-oauth/blob/master/nodejs/provider-oauth20-provider/model/client.js).

### Service Provider

The website of the service provider is at `localhost:8000`.

Basic login functionality is implemented, and can be access at the top bar in `index.html`,
or by going to `localhost:8000/login`.

You can log out by also using the top bar in `index.html`, or sending a `POST` to
`localhost:8000/logout`.

Please see [routes.js](https://github.com/yamgent/cs5331-oauth/blob/master/nodejs/provider-oauth20-provider/routes/routes.js)
for more details. `index.html` also contains some examples for invoking endpoints.
