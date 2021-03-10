const secretKey = 'secret_key';
const expires = '10m';

module.exports = {
    jwt: {
        secret: secretKey,
        options: {
            expiresIn: expires
        }
    }
};
