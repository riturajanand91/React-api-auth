const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Follow = require("../models/follow");
const auth = require("../middlewares/auth");
const ObjectID = require("mongodb").ObjectID;
const mongoose = require("mongoose");


router.get("/api/userprofile/:id",auth,async (req, res) => {
  try {
    let ifVisitorFollowAlreadyExist = await Follow.findOne({
      userId: req.user._id,
      authorId: new mongoose.Types.ObjectId(req.params.id),
    });
    // console.log(ifVisitorFollowAlreadyExist);
    if (ifVisitorFollowAlreadyExist) {
      isfollowing = true;
    }

    // FOR THE USER IN PARAMS TO CHEKC FOLLOWERS OF THE Followed ID
    const user = await User.findById(req.params.id) ///followedId
    await user.populate('golu').execPopulate()
    console.log(user.golu);

    // FOR THE LOGGED INUSER TO CHECk THE FOLLOWED USERS
    const user1 = await User.findById(req.user._id) ///authorId
    await user1.populate('rituraj').execPopulate()
    console.log(user1.rituraj);

    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.send({user,followers:user.golu,followed:user1.rituraj,isfollowing:true});
  } catch (e) {
    res.status(500).send(e);
  }
});

// followedId  authorId

router.post("/api/follow/:id", auth, async (req, res) => {
  try {
    // console.log("entry point");
    const follow = new Follow({
      ...req.body,
      authorId: req.user._id, //the user which is logged in and has auth token
      followedId: req.params.id, //the user which is not logged in and their username is passed on as paramater
    });
    let doesFollowAlreadyExist = await Follow.findOne({followedId: req.params.id, authorId: new mongoose.Types.ObjectId(req.user._id)})
 
    if (doesFollowAlreadyExist) {
      console.log("Already following loop: " + doesFollowAlreadyExist);
      console.log("You are already following this user.");
      res.status(400).send({ error: "You already follow the author" });
    }

    else if (req.user._id.equals(req.params.id)) {
      console.log("cannot follow yourself loop: " + doesFollowAlreadyExist);
      this.errors.push("You cannot follow yourself.");
    }

    else {
      console.log("last bloick ");
      console.log(follow);
      await follow.save();
      return res.status(200).send({follow,followed:'true'});
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/unfollow/:id", auth, async (req, res) => {
  try {
    let doesFollowAlreadyExist = await Follow.deleteOne({
      authorId: req.user._id,
      followedId: new mongoose.Types.ObjectId(req.params.id),
    });
    console.log(doesFollowAlreadyExist);
    res.send(unfollow);
    console.log("Unfollowed Author");
  } catch (e) {
    res.status(201).send();
  }
});

module.exports = router;
