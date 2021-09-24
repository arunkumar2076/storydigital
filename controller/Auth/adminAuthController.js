/**
 * Admin Auth controller
 *
 */

const Admin = require('../../models/admin')
const { hash, compare } = require('../../utils/hashing')
const {generateAdminToken, generateForgetToken} = require('../../utils/jwtUtils')

class AdminAuthController {

    /**
     * login script
     * @todo need to clear will it be single sign on function or multiple session will be valid
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    static async login(req, res, next) {
        // return res.json({error:true  , msg:req.body})
        const { email, password } = req.body
        Admin.findOne({ email: email }).then(data => {
            // return res.json({error:false , data})
            if (!data) return res.status(400).json({
                error: true,
                msg: "Invalid login , Auth failed",
            })
            const hashedPassword = data.password
            const result = compare(password, hashedPassword)
            if (!result) return res.status(401).json({
                error: true,
                msg: "Auth failed  ,Email  and password combination is not valid"
            })
            // const adminId = data._id
            const payload = {
                _id: data._id
            }
            data = data.toObject()
            delete data.password
            const token = generateAdminToken({ payload: payload })
            /**
             * @todo need to implement admin session
             */
            return res.status(200).json({ error: false, token: token, user: data})
        }).catch(er => {
            return res.status(403).json({ error: true, msg: er.message })
        })

    }

    /**
     * create new admin
     * @param {request} req
     * @param {response} res
     * @param {} next
     */
    static async register(req, res, next) {
        const body = req.body
        body.password = hash(body.password)
        const newAdmin = new Admin(body)
        newAdmin.save().then(data => {
            return res.status(201).json({ error: false, data: data })
        }).catch(e => {
            return res.status(400).json({ error: true, msg: e.message })
        })
    }
}


module.exports = AdminAuthController