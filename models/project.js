import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  details: { type: String, required: true },
  gitlink: String,
  livelink: String,
  videoLink: String,
  image: String,
  category: String,
  images: {
    type: Array,
  },
  title: {
    type: String,
    required: true,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
