import mongoose, { Schema } from "mongoose";

const blogDetailsSchema = new Schema({
  user: Object,
  details: String,
  image: String,
  author: String,
  email: String,
  videoLink: String,
  blog_links: {
    type: Object,
  },
});

const BlogDetail =
  mongoose.models.BlogDetail || mongoose.model("BlogDetail", blogDetailsSchema);

export default BlogDetail;
