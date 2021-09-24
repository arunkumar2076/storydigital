const PostController = require('../controller/postController')
const { postCreate, readMany } = require('../validator/post')
const { isAuthAdmin } = require('../middleware/authchecker')
const postRouter = require('express').Router()


postRouter.post('/v1', isAuthAdmin, postCreate, PostController.create)
postRouter.get('/v1', isAuthAdmin, readMany, PostController.readMany)
postRouter.get('/v1/:_id', isAuthAdmin, PostController.readOne)
postRouter.delete('/v1/:_id', isAuthAdmin, PostController.deleteOne)

module.exports = postRouter