import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    articleTitle: String,
    articleCategory: String,
    user: Object,
    details: {
        type: String,
        required: true
    },
    image: String,



    author: String,
    email: String,
    videoLink: String,
    blog_links: {
        type: Object,
       
    },
    
    
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
