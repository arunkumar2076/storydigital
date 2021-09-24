//admin validator

const { body, validationResult } = require('express-validator')

//validate register body
//while creating new admin
const postCreate = [
    body(['title', 'body'])
        .isString()
        .withMessage('Error,  Title, Body'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: true, msg: "Validation error", errors: errors.array() });
        }
        next()
    }
]

const readMany = async (req, res, next) => {

    try {
        if (req.query.filters) {
            req.query.filters = JSON.parse(req.query.filters);
        }
        if (typeof req.query.pageNumber != 'number') {
            req.query.pageNumber = parseInt(req.query.pageNumber);
        }
        if (typeof req.query.perPage != 'number') {
            req.query.perPage = parseInt(req.query.perPage);
        }
        if (req.query.sort) {
            req.query.sort = JSON.parse(req.query.sort);
        }
    } catch (error) {
        return res.status(400).json({ error: true, errors: error.message, msg: "Invalid filters" });
    }
    return next();

}

module.exports = { postCreate, readMany }
