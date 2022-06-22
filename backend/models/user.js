const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    tokens: [
      {
        authToken: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  })

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'owner'
})

/////For extracting followers of logged user
// followedId   ===> authorId 
userSchema.virtual('rituraj', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'authorId'
})

userSchema.virtual('golu', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'followedId'
})



userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const authToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  );

  //the constant name should be same as the db collection field name
  user.tokens = user.tokens.concat({ authToken });
  await user.save();

  return authToken;
};

//hide all few tokens and passowrd from json response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

///findByCredentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User Not found!!Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password or email incorrect!!Please check Credentials");
  }

  return user;
};

// Using bcrypt to hash the passwords
userSchema.pre("save", async function (next) {
  const user = this;

  //if loop hashses password when password change occurs
  if (user.isModified("password")) {
    ///for hashing at the time of user creation
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model('User', userSchema); //here User is the schema name
module.exports = User;
