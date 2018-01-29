const express = require('express');
const router = express.Router({ mergeParams: true })
const Gift = require('../db/models/Gift')

router.get('/', async (req, res) => {
    try {
        const gifts = await Gift.find({})
        rest.json(gifts)
    }   catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//Get a single gift
router.get('/:giftId', async (req, res) => {
    try {
        console.log(req.params.giftId)
        const gift = await Gift.findById(req.params.giftId)
        // send json of gift
        req.json(gift)
    } catch (err) {
        res.send(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const newGift = await Gift.create({})
        res.json(newGift)
    }   catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.delete('/:giftId', async (req, res) => {
    try {
        await GiftfindByIdAndRemove(req.params.giftId)
        res.sendStatus(200)
    }   catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.patch('/:giftId', async (req, res) => {
    try {
        const updatedGift =
         await Gift.findByIdAndUpdate(req.params.giftId, req.body, {new: true})
    console.log('FromGiftPatch:'+req.body)
        res.json(updatedGift)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
})

module.exports = router