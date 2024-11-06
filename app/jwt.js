import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Set up JWKS client to retrieve Auth0 public keys
const client = jwksClient({
  jwksUri: process.env.AUTH0_ISSUER_BASE_URL + '/.well-known/jwks.json',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export function getToken (request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}

// Function to verify the token
export function verifyAuth0Token(request) {
  const token = getToken(request);

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ['RS256'],
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER_BASE_URL + '/',
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      }
    );
  });
}