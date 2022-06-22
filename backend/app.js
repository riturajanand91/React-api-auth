const express = require("express");
require("./database/mongoose"); //requiring db for the whole app();

const bodyParser = require("body-parser");
const chalk = require("chalk");

const userRoutes = require("./routing/users");
const adminRoutes = require("./routing/admin");
const authRoutes = require("./routing/auth");
const postRoutes = require("./routing/postRoute");
const followRoutes = require("./routing/follow");

require("dotenv").config({ path: "config/dev.env" });
const cors = require("cors");

const app = express(); //binding app to express middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(postRoutes);
app.use(followRoutes);

///Creating our server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(chalk.blue("Server is running on port " + process.env.PORT));
});

const Task = require('./models/post')
const User = require('./models/user')

const main = async () => {

  // try{
  //    const task = await Task.findById('5f5f1fcbe885f7c774cb7cef');
  //   await task.populate('owner').execPopulate()
  //   console.log(task.owner.name)
  //   // console.log(task);
  // }
  // catch(e){
  //   console.log("this is error");
  // }
    
    // const user = await User.findById('5f5fa359c3997f028ca8ad6f')
    // // console.log(user);
    // await user.populate('posts').execPopulate()
    // console.log(user.posts);
    // // // await user.populate('Post').execPopulate()
    // // console.log(user.tasks)
    
    ////getFollowersById
    // followedId   ===> authorId   lookup/ref =====> user
    // 5f5fa2e9c3997f028ca8ad6c    
    const user = await User.findById('5f5fa2e9c3997f028ca8ad6c') ///followedId
    // console.log(user);
    await user.populate('golu').execPopulate()
    console.log(user.golu);
    // // await user.populate('Post').execPopulate()
    // console.log(user.tasks)

    // getFollowingById authorId ==> followedId  lookup/ref =====> user
    const user1 = await User.findById('5f5da9ddee2ca8c7ecc7e810') ///authorId
    // console.log(user);
    await user1.populate('rituraj').execPopulate()
    console.log(user1.rituraj);
    // // await user.populate('Post').execPopulate()
    // console.log(user.tasks)
}

// main()

