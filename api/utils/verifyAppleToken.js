// utils/verifyToken.js
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const verifyToken = (idToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      idToken,
      getKey,
      {
        audience: 'com.ramzyn12.someapppp', // Your app's identifier
        issuer: 'https://appleid.apple.com',
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

module.exports = verifyToken;
