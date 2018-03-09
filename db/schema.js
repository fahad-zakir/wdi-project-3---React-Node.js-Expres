const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const InfoSchema = new Schema({

    giftName: {
        type: String,
        // required: [true, 'Gift title is required!']
    },
    for: {
        type: String,
        // required: [true, 'For is required']
    },
    price: {
        type: Number,
        // required: [true, 'Price is required!']
    }
}, {
        timestamps: {}
    })

const GiftSchema = new Schema({
    giftName: {
        type: String,
        // required: [true, 'Gift name is required!']
    },
    userID: {
        type:String
    },
    infoList: [InfoSchema]
}, {
        timestamps: {}
    })

const UserSchema = new Schema({
    firstName: {
        type: String,
        // required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        // required: [true, 'Last name is required!']
    },
    email: {
        type: String
    },
    gifts: [GiftSchema]
}, {
        timestamps: {},
        usePushEach: true
    })

module.exports = {
    UserSchema,
    GiftSchema,
    InfoSchema
}

