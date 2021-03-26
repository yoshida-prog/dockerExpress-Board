const secretKey = process.env.SECRET_KEY;
const expires = process.env.EXPIRES;

module.exports = {
    jwt: {
        secret: secretKey,
        options: {
            expiresIn: expires
        }
    }
};