const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const GiftSchema = new Schema({

    giftName: {
        type: String,
        required: [true, 'Gift title is required!']
    },
    for: {
        type: String,
        required: [true, 'For is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']
    }
}, {
        timestamps: {}
    }
)

const WishlistSchema  = new Schema({
    giftName: {
        type: String,
        required: [true, 'Gift name is required!']
    },
    giftList: [GiftSchema]
}, {
        timestamps: {}
})

const UserSchema = new Schema({
    username: {
        type: String,
        required: [ture, 'First name is required!']
    },
    email: {
        type: String
    },
    firstName: {
        type: String,
        required: [ture, 'First name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    wishlists: [WishlistSchema]
}, {
    timestamps: {},
    usePushEach: true
})

module.exports = {
    WishlistsSchema,
    UserSchema,
    GiftSchea
}

const UserModel = mongoose.model('User', UserSchema)
const IdeaModel = mongoose.model('Idea', IdeaSchema)

module.exports = {
    User: UserModel,
    Idea: IdeaModel
}