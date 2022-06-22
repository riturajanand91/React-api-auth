const mongoose = require("mongoose");
const FollowSchema = new mongoose.Schema(
  {
    followedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Follow = mongoose.model("Follow", FollowSchema); 
module.exports = Follow;
