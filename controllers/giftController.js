const express = require('express');
const router = express.Router({ mergeParams: true })
// This mergeParams is important! It means that you should be able to get route params from the full route
const User = require("../db/models/User");
const Gift = require("../db/models/Gift");


// get routes
router.get("/", async (req, res) => {
  Gift.find({})
    .then(gifts => {
      //Find all of the users from the database
      //send JSON back for all users
      res.json(gifts);
      //.Catch is used for any errors that might appear
    })
    .catch(err => {
      console.log(err);
      res.json("caught error");
    });
});

// get routes
router.get("/", async (req, res) => {
    const userId = req.params.userId

  User.findById(userId)
    .then((user) => {
      //Find all of the users from the database
      //send JSON back for all users
      res.json(gifts, {
      //.Catch is used for any errors that might appear
      userFullName: `${user.firstName} ${user.lastName}`,
      userId: user._id,
      gifts: user.gifts,
      photoUrl: user.photoUrl
      })
    })
    .catch(err => {
      console.log(err);
      res.json("caught error");
    });
})

  router.get('/new', (req, res) => {
    const userId = req.params.userId
    res.render(gifts, {
      userId
    })
  })

  router.get('/:giftId', (req, res) => {
    const userId = req.params.userId
    const giftId = req.params.giftId

    User.findById(userId)
      .then((user) => {
        const gift = user.gifts.id(giftId)
        res.render(gifts, {
          userId,
          gift
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })

router.post('/', async (req, res) => {
  try {
    const newGift = await Gift.create(req.body)
    res.json(newGift)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.delete('/:giftId/delete', async (req, res) => {
  try {
    await Gift.findByIdAndRemove(req.params.giftId) // Delete the user from the database
    res.sendStatus(200) // Send back a status of 200 to tell the user that the delete was successful
  } catch (error) {
    console.log(error)
    res.sendStatus(500) // If there is any error, tell the user something went wrong on the server
  }
})








module.exports = router