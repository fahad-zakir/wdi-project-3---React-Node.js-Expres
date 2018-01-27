const express = require('express')
const router = express.Router()


const User = require('../db/models/User')

//================================
//  READ (see all users)
//================================
router.get('/', (req, res) => {
    User.find({}).then(users => {
        res.json(users)

    }).catch(err => {
        console.log(error)
        res.json("caught error")
    })
})
module.exports = router