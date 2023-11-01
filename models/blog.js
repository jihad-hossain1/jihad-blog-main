import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    articleTitle: String,
    articleCategory: String,
    author: String,
    email: String,
    videoLink: String,
    image: String,
    blog_links: {
        type: Object,
        required: true
    },
    details: {
        type: Object,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
