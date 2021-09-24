//admin validator

const {body, validationResult} = require('express-validator')

//validate register body
//while creating new admin
const adminRegister = [
    body(['firstName', 'lastName'])
        .isAlpha()
        .withMessage('Error,  first name , last name'),
    body('email').isEmail()
        .withMessage('Error , invalid email'),
    body('mobile').isMobilePhone("en-IN")
        .withMessage("Invalid mobile number"),
    body('password').isLength({min: 6}).withMessage("Password minimum of 6 character"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({error: true, msg: "Validation error", errors: errors.array()});
        }
        next()
    }
]


const adminLogin = [
    body('email').isEmail().withMessage('Error check enetered email'),
    body('password').isLength({min: 6}).withMessage('Error ,  password length of 6 character required'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({error: true, msg: "Validation error", errors: errors.array()})
        next()
    }
]


module.exports = {adminRegister, adminLogin}
