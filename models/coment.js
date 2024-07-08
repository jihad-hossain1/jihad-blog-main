import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
    maxlength: [500, "Content cannot be more than 500 characters"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ], // Recursive reference to support nested replies
});

const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
    maxlength: [500, "Content cannot be more than 500 characters"],
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  replies: [replySchema], // Array of replies
});

const Coment =
  mongoose.models.Coment || mongoose.model("Coment", commentSchema);

export default Coment;
