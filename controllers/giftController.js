const express = require('express');
const router = express.Router({ mergeParams: true })
// This mergeParams is important! It means that you should be able to get route params from the full route
const Gift = require('../db/models/Gift')

router.get('/', async (req, res) => {
    Gift.find({}).then(gifts => { //Find all of the users from the database
        //send JSON back for all users
        res.json(gifts)
        //.Catch is used for any errors that might appear
    }).catch(err => {
        console.log(err)
        res.json("caught error")
    })
})

//Get a single gift
router.get('/:giftId', async (req, res) => {
    try {
        console.log(req.params.giftId)
        const gift = await Gift.findById(req.params.giftId)
        // send json of gift
        res.json(gift)
    } catch (err) {
        res.send(err)
    }
})

// Find a user, then create a new Gift, push it into the users existing gifts and then save the user
router.post('/', async (req, res) => {
    try {
        const newGift = await Gift.create(req.body)
        res.json(newGift)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// Find a specific gift by then delete it
router.delete('/:giftId', async (req, res) => {
    try {
        await GiftfindByIdAndRemove(req.params.giftId)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// Find a user, then search for a specific idea id, then update the idea based on the contents of req.body.idea 
router.patch('/:giftId', async (req, res) => {
    try {
        const updatedGift =
            await Gift.findByIdAndUpdate(req.params.giftId, req.body, { new: true })
            console.log('FromGiftPatch:' + req.body)
            res.json(updatedGift)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router