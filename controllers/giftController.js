const express = require('express');
const router = express.Router({ mergeParams: true })
// This mergeParams is important! It means that you should be able to get route params from the full route
const User = require("../db/models/User");
const Gift = require("../db/models/Gift");


//get routes
// router.get("/", async (req, res) => {
//   Gift.find({})
//     .then(gifts => {
//       //Find all of the users from the database
//       //send JSON back for all users
//       res.json(gifts);
//       //.Catch is used for any errors that might appear
//     })
//     .catch(err => {
//       console.log(err);
//       res.json("caught error");
//     });
// });

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

  //new gift
  router.get('/new', (req, res) => {
    const userId = req.params.userId
    res.render(gifts, {
      userId
    })
  })

  router.get('/:giftId', (req, res) => {
    const userId = req.params.userId
    const giftId = rq.params.giftId

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

router.post('/', (request, response) => {
    const userId = request.params.userId
    const newGift = request.body

    User.findById(userId)
        .then((user) => {
            user.gifts.push(newGift)
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/gifts`)
        })
        .catch((error) => {
            console.log(error)
        })

})


router.get('/:giftId/delete', (request, response) => {
    const userId = request.params.userId
    const giftId = request.params.giftId

    User.findById(userId)
        .then((user) => {
            user.gifts.id(giftId).remove()
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/gifts/`)
        })
        .catch((error) => {
            console.log(error)
        })
})









module.exports = router