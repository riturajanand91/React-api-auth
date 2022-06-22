const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    authorId: {
      type: String,
      trim: true,
    },
    createdDate: {
      type: Date,
      trim: true,
      default: new Date(),
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  }
  },
  {
    timestamps: true,
  }
);


postsSchema.pre("save", function (next) {
  this.authorId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  next();
});

postsSchema.plugin(timeZone);
const Post = mongoose.model('Post', postsSchema);

module.exports = Post;



