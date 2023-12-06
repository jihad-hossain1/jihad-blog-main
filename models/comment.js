import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    name: String,
    email: String,
    details: String,
    blogId: String
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
