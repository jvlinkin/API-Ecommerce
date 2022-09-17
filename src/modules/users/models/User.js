const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },

    age: {
        type:Number,
        required: true
    },

    cellphone: {
        type:String,
        required: true
    },

    email: {
        type:String,
        required: true
    },

    username: {
        type:String,
        required: true
    },

    password: {
        type:String,
        required: true
    },

    isAdmin: {
        type:Boolean,
        default: false,
        required: true
    },

},
{
    timestamps: true
})

module.exports = mongoose.model('Users', Schema)