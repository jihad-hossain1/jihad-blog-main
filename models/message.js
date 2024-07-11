import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: [true, "message is required"],
    trim: true,
    maxlength: [500, "message cannot be more than 500 characters"],
  },

  subject: {
    type: String,
    required: [true, "subject is required"],
    trim: true,
    maxlength: [50, "subject cannot be more than 50 characters"],
  },

  createdAt: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
