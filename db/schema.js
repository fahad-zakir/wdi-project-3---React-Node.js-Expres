const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
// so it's available every where

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
    // this is a list of info objects that look like the infoschema
    // gift can have mulitple info objects and each object looks like infoschema
}, {
        timestamps: {}
    })

const UserSchema = new Schema(
  {
    firstName: {
      type: String
      // required: [true, 'First name is required!']
    },
    lastName: {
      type: String
      // required: [true, 'Last name is required!']
    },
    email: {
      type: String
    },
    photoUrl: {
      type: String,
      default:
        "http://pluspng.com/img-png/gift-png-png-file-name-christmas-gift-400.png"
    },
    gifts: [GiftSchema]

    // when you go to a user profile, it can have gifts, and the gifts have giftinfo
  },
  {
    timestamps: {},
    usePushEach: true
  }
);

module.exports = {
    UserSchema,
    GiftSchema,
    InfoSchema
}

