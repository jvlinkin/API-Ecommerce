const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],


    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    address:{
        street:{
            type:String,
            required:true
        },
        number:{
            type:String,
            required: true
        },
        city:{
            type: String,
            required: true
        }
    },

    payment:{
        card:{
            number:{
                type: String,
                required: true
            },
            cvc:{
                type: String,
                required: true
            }
        }
    }



},
{
    timestamps: true
})

module.exports = mongoose.model('Cart', Schema)