import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    link: String,
    
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default Resume;