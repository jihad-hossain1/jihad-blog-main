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
  photo: {
    type: String,
  },

  details: {
    type: String,
    required: [true, "details are required"],
    trim: true,
    maxlength: [200, "details can not be more than 200 characters"],
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
      details: {
        type: String,
        required: [true, "details are required"],
        trim: true,
        maxlength: [200, "details can not be more than 200 characters"],
      },
      photo: {
        type: String,
      },

      commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
