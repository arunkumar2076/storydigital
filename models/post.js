const mongoose = require('mongoose')

const schema = mongoose.Schema

const Post = new schema({
        title: {
            type: String,
            require: [true, 'Title is required']
        },
        body: {
            type: String,
            require: [true, 'Body is required']
        },
        createdBy: {
            type: schema.Types.ObjectId,
            ref:"admin",
            default:null
        }
    },
    {timestamps: true},
)

module.exports = mongoose.model('post', Post)