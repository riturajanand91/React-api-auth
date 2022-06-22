const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require('../middlewares/auth')

// POST method to CREATE USER
// router.post("/api/users/register", async (req, res) => {
//   const user = new User(req.body);
//   console.log(user);
//   try {
//     await user.save();
//     const authToken = await user.generateAuthToken();
//     res.status(201).send({ message: "User Registration Successful!", user, authToken });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.post("/api/users/register", async (req, res) => {
  // console.log(req.body);
  try {
    const user = new User(req.body);
    const checkExisting = await User.findOne({ email: user.email });
    console.log(checkExisting);
    if (checkExisting) {
      return res.status(404).send({
        message: "User Already Exists With the provided email ",
        data: `It looks like a user already exists with same email id`
      });
    }
    const authToken = await user.generateAuthToken();
    await user.save();
    // registerWelcome(user.email, user.firstName, user.lastName, req.body.password, req.body.role);
    return res.status(201).send({ message: `" user Created Successfully"`, user, authToken });
  } catch (e) {
    return res.status(500).send({ message: `" user creation failed"`, data: e.message });
  }
})
//POST METHOD FOR USER LOGIN
// router.post("/api/users/login", async (req, res) => {
//   try {
//     // console.log("in our service :"+req.body.email);
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const authToken = await user.generateAuthToken();
//     // console.log(user);
//     const message = "User Login Successful!";
//     res.send({ user, authToken, message });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    console.log(user);
    // if (!user.role == "admin" || !user.role == "staff") {
    //   return res.status(403).send({ status: 403, error: "Forbidden! Access Not Allowed", data: "User should be admin or staff" });
    // }
    // if (user.isActive == "false") {
    //   return res.status(400).send({ error: "User Disabled By Administrator! Please contact Administrator" });
    // } else {
    console.log("User Logged in with Role: " + user.role);
    const authToken = await user.generateAuthToken();
    return res.status(201).send({ user, authToken });
    // }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
//POST METHOD FOR USER LOGOUT
// router.post('/api/users/logout', auth, async (req, res) => {
//   console.log(req.user)
//   // console.log('coming here');
//   // console.log(req.user.token ); ///the stored token 
//   // console.log(req.user.authToken);
//   try {
//     req.user.tokens = req.user.tokens.filter((authToken) => {
//       return authToken.authToken !== req.token
//     })
//     await req.user.save()

//     res.send()
//   } catch (e) {
//     res.status(500).send()
//   }
// })

router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((authToken) => {
      return authToken.authToken !== req.token;
    });
    await req.user.save();
    res.status(200).send({ message: "Logged Out" });
  } catch (e) {
    res.status(500).send({ message: 'Logout failed' });
  }
});

//POST METHOD FOR USER LOGOUT FROM EVERY DEVICE
router.post('/api/users/logoutall', auth, async (req, res) => {
  // console.log('coming here');

  try {
    req.user.tokens = []
    await req.user.save()
    res.send('Signed Out of all sessions')
  } catch (e) {
    res.status(500).send()
  }
})

//Exporting for reuse
module.exports = router;
