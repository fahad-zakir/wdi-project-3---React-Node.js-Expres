const express = require('express')
const router = express.Router()
const User = require('../db/models/User')

//================================
//  READ (see all users)
//================================

router.get('/', (req, res) => {
    User.find({}).then(users => { //Find all of the users from the database
        //send JSON back for all users
        res.json(users)
        //.Catch is used for any errors that might appear
    }).catch(err => {
        console.log(err)
        res.json("caught error")
    })
})

//something that follows the colons up to the next forward slash will be a req parameter
router.get('/:userId', (req, res) => {
    const userId = req.params.userId
    // Find By The ID "userId" in the User part of the database
    User.findById(userId)
    // user mean's we are finding one user
    // Then with the 'user' we get back do something
        .then((user) => {
            //BEFORE we call res.json this will be the user information how the database holds it
            res.json(user)
            //WHEN we call res.json it gets formatted to be a json object
        }).catch(error => {
            console.log(err)
            res.json("caught error")
        })
})

// router.get('/', (req,res) => {
//     res.json({name: 'Fahad'})
// })

// router.get('/kevin', (req, res) => {
//     res.json({ name: 'kevin' })
// })

//To create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)// Send this new user back to the user
        console.log(newUser)
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // If there is any error, tell the user something went wrong on the server
    }
})

//To delete a user
router.delete('/:userId/delete', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId) // Delete the user from the database
        res.sendStatus(200) // Send back a status of 200 to tell the user that the delete was successful
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // If there is any error, tell the user something went wrong on the server
    }
})

//To edit a user
router.patch('/:userId', async (req, res) => {
    try {
        //Update the user in the database
        const updatedUser =
            await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        res.json(updatedUser) // Send the updated user back to the client
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // If there is any error, tell the user something went wrong with the server
    } 
})

module.exports = router