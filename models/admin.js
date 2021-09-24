const mongoose = require('mongoose')

const schema = mongoose.Schema

const Admin = new schema({
        firstName: {
            type: String,
            require: [true, 'First name is required']
        },
        lastName: {
            type: String,
            require: [true, 'First name is required']
        },
        mobile: {
            type: String,
            require: [true, 'Mobile number is required'],
            unique: [true, 'Mobile already Exists'],
            validate: [val => val.length === 10, 'Mobile Number should be of 10 digit.'],
            trim: true
        },
        email: {
            type: String,
            require: [true, 'Email is required'],
            unique: [true, 'Mobile already Exists'],
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: [true, 'Password is Required'],
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true},
)

module.exports = mongoose.model('admin', Admin)