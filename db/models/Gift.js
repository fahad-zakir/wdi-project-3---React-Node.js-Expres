const mongoose = require('mongoose')
const Schema = require('../schema')

const Gift = mongoose.model('Gift', Schema.GiftSchema)

module.exports = Gift