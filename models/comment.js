import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      reply: {
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
