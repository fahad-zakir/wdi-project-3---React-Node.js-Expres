const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise
// so it's available every where

const GiftSchema = new Schema(
  {
    giftName: {
      type: String
      // required: [true, 'Gift name is required!']
    },
    for: {
      type: String
    },
    price: {
      type: Number
    },
    giftPhotoUrl: {
      type: String,
      default:
        "https://www.creativefabrica.com/wp-content/uploads/2018/11/Happy-Birthday-Gift-Black-Yellow-by-Surya-Darmawan-580x386.png"
    }
  },
  {
    timestamps: {}
  }
);

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
    GiftSchema
}

