// db/schema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const GiftSchema = new Schema(
  {
    giftName: {
      type: String,
    },
    for: {
      type: String,
    },
    price: {
      type: Number,
    },
    giftPhotoUrl: {
      type: String,
      default:
        "https://www.creativefabrica.com/wp-content/uploads/2018/11/Happy-Birthday-Gift-Black-Yellow-by-Surya-Darmawan-580x386.png",
    },
  },
  {
    timestamps: {},
  }
);

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    photoUrl: {
      type: String,
      default:
        "http://pluspng.com/img-png/gift-png-png-file-name-christmas-gift-400.png",
    },
    gifts: [GiftSchema],
  },
  {
    timestamps: {},
    usePushEach: true,
  }
);

module.exports = {
  UserSchema,
  GiftSchema,
};
