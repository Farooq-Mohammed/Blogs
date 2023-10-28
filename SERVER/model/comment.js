import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Comment = mongoose.model("comment", commentSchema);

export default Comment;