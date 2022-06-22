const express = require("express");
const router = new express.Router();
const Post = require("../models/post");
const auth = require("../middlewares/auth")
//Add post
router.post("/api/create",auth, async (req, res) => {
  // console.log('inside post create');
  const post = new Post({
    ...req.body,
    owner:req.user._id,
    author:req.user.name
  });
  
  console.log(post);
  try {
    await post.save();
    res.status(201).send({ post });
  } catch (e) {
    res.status(400).send();
  }
});

// router.get("/api/posts",auth, async (req, res) => {
//   // console.log('comnig here'+req.user);

//   try {
//     await req.user.populate('posts').execPopulate()
//     // console.log('dvsvbisdi');
//     res.send(req.user.posts)
// }
// catch (e) {
//     res.status(500).send();
//   }
// });
router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send({ posts });
  } catch (e) {
    res.status(500).send();
  }
});


// try{
//   const task = await Task.findById('5f5f1fcbe885f7c774cb7cef');
//  await task.populate('owner').execPopulate()
//  console.log(task.owner.name)
//  // console.log(task);
// }
// catch(e){
//  console.log("this is error");
// }
//Route to Read User by specific id
router.get("/api/post/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //
    const post = await Post.findOne({_id,owner:req.user.id})
    // const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).send("No post Found");
    }
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.get("/api/post/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const post = await Post.findById(_id);
//     if (!post) {
//       return res.status(404).send("No post Found");
//     }
//     res.send(post);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

//Route to Update Post
router.patch("/api/post/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  // console.log(req.body);
  // const allowedUpdates = ["name", "quantity", "purchasedDate"];

  // // const isValidOperation = updates.every((update) =>
  // //   allowedUpdates.includes(update)
  // // );

  // // if (!isValidOperation) {
  // //   return res.status(400).send({ error: "Invalid updates!" });
  // // }
  const _id = req.params.id;
  // console.log(_id)
  try {
    const post = await Post.findByIdAndUpdate(_id);
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    if (!post) {
      return res.status(404).send("No post Found");
    }
    res.send(post);
    console.log(post.title + " Post Updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/post/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
    console.log("Post Deleted");
  } catch (e) {
    res.status(201).send();
  }
});

module.exports = router;
