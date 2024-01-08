import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    articleTitle: String,
    articleCategory: String,
    sortContent: String,
    details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogDetail",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
