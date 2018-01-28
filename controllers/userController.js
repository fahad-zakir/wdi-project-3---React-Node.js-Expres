const express = require('express')
const router = express.Router()
const User = require('../db/models/User')

//================================
//  READ (see all users)
//================================

router.get('/', (req, res) => {
    User.find({}).then(users => { //Find all of the users from the database
        res.json(users)  //send JSON back for all users
//.Catch is used for any errors that might appear
     }).catch(err => {
        console.log(error)
        res.json("caught error")
    })
})

//To create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
        console.log(newUser)
    } catch(err) {
        res.send(err)
    }
})

//To delete a user





module.exports = router