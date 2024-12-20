const express = require("express");
const router = express.Router();
const User = require("../db/models/User");

// Get all users
router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.json("caught error");
    });
});

// Get single user
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.json("caught error");
    });
});

// Create new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
    console.log(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete user
router.delete("/:userId/delete", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Update user
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get all gifts for a user
router.get("/:userId/gifts", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.gifts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Add new gift to user
router.post("/:userId/gifts", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.gifts.push(req.body);
    const savedUser = await user.save();
    res.json(savedUser.gifts[savedUser.gifts.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update a gift
router.patch("/:userId/gifts/:giftId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const gift = user.gifts.id(req.params.giftId);
    gift.set(req.body);
    const savedUser = await user.save();
    res.json(gift);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Delete a gift
router.delete("/:userId/gifts/:giftId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.gifts.id(req.params.giftId).remove();
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
