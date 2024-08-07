import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  articleTitle: {
    type: String,
    required: true,
    trim: true,
    max: [100, "Title cannot be more than 100 characters"],
    min: [10, "Title cannot be less than 10 characters"],
  },
  articleCategory: {
    type: String,
    required: true,
    max: [50, "Category cannot be more than 50 characters"],
    trim: true,
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  sortContent: {
    type: String,
    required: true,
    max: [250, "Content cannot be more than 250 characters"],
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogDetail",
  },
  slug: {
    type: String,
    required: true,
    unique: [true, "Slug must be unique"],
    lowercase: true,
    index: true,
    trim: true,
    max: [250, "Slug cannot be more than 250 characters"],
  },
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Author Name is required"],
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
