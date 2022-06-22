const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require('../middlewares/auth')

//FETCH USER BY Profile ID 
router.get('/api/users/profile',auth, async (req, res) => {
  // console.log(req);
  // console.log("router.get('/users/me')");
  res.send(req.user)
})

// PATCH method to UPDATE 
router.patch("/api/users/profile/update",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  // const _id = req.params.id;

  try {
    // console.log('try block')
    // const user = await User.findById(_id);
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save();
    res.send(req.user);
    console.log("User details Updated");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/profile/delete', auth, async (req, res) => {
  try {
      await req.user.remove()
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
})

//Exporting for reuse
module.exports = router;
