module.exports = {
    jwt: {
        secret: 'secret_key',
        options: {
            algorithm: 'HS256',
            expiresIn: '10m'
        }
    }
};