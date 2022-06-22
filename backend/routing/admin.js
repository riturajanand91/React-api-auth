const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Follow = require("../models/follow");
const auth = require('../middlewares/auth')

// GET method to READ/FETCH all users
router.get("/api/users/all", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send();
  }
});

///MOVE D TO FOLLOW ROUTE
//this is used for fetching user posts in normal conditions as well
// GET method to READ/FETCH BY SPECIFIC ID
router.get("/api/users/:id",async (req, res) => {
  // console.log(req);
  const _id = req.params.id;
  // console.log(req.params.id);
  try {
    const user = await User.findById(_id);
    // console.log(user);
    await user.populate('posts').execPopulate()
    // console.log(user.posts);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send({user,postDetail:user.posts});
  } catch (e) {
    res.status(500).send(e);
  }
});


router.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    const authToken = await user.generateAuthToken();
    res.status(201).send({ user, authToken });
  } catch (e) {
    res.status(400).send(e);
  }
});


// PATCH method to UPDATE 
router.patch("/api/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send(user);
    console.log("User details Updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE method to DELETE
router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(201).send();
  }
});

module.exports = router