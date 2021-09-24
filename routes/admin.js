const AdminAuthController = require('../controller/Auth/adminAuthController')
const { adminRegister, adminLogin, adminForget, resetPassword, verifyOtp } = require('../validator/admin')
const { isAuthAdmin } = require('../middleware/authchecker')
const adminRouter = require('express').Router()
const PostController = require('../controller/postController')
const { postCreate, readMany } = require('../validator/post')


adminRouter.post('/v1/login', adminLogin, AdminAuthController.login)
adminRouter.post('/v1', adminRegister, AdminAuthController.register)
adminRouter.get('/v1', isAuthAdmin, readMany, PostController.readOwnPost)

module.exports = adminRouter