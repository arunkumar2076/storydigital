const jwt = require('jsonwebtoken')
const LOGIN_SECRET_KEY_ADMIN = process.env.LOGIN_SECRET_KEY_ADMIN
const generateAdminToken = ({payload}) => {
    try {
        return jwt.sign(payload, LOGIN_SECRET_KEY_ADMIN, {expiresIn: '24h'})
    } catch (e) {
        return null
    }
}
module.exports = { generateAdminToken}