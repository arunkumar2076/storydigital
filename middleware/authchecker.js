const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
const LOGIN_SECRET_KEY_ADMIN = process.env.LOGIN_SECRET_KEY_ADMIN


/**
 * to verify is Auth Admin or not
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuthAdmin = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({error: true, msg: "Auth failed"})
    try {

        const payload = jwt.verify(token, LOGIN_SECRET_KEY_ADMIN)
        const {_id} = payload
        const adminData = await Admin.findById(_id).select(["-password"])
        if (null == adminData || !adminData.active) return res.status(401).json({error: true, msg: "Auth failed"})
        req["admin"] = adminData
        next()
    } catch (e) {
        return res.status(401).json({error: true, msg: e.message})
    }
}


module.exports = { isAuthAdmin}