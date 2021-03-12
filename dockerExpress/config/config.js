const secretKey = process.env.SECRET_KEY;
const expires = process.env.EXPIRES;

console.log(secretKey, expires);

module.exports = {
    jwt: {
        secret: secretKey,
        options: {
            expiresIn: expires
        }
    }
};
