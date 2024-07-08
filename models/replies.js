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
  parentReplyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
    default: null,
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
  ], // References to nested replies
});

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
