import mongoose from "mongoose";

const ResumeSchema = mongoose.Schema({
  nickName: { type: String, min: 3, max: 15, required: true },
  city: { type: String, required: true },
  category: { type: Array, min: 1, max: 4, required: true },
  experience: { type: String, required: true },
  avatar: {
    data: Buffer,
    contentType: String,
  },
  about: { type: String, min: 100, required: true },
  phoneNumber: { type: String, required: true },
  facebook: { type: String },
  instagram: { type: String },
  telegram: { type: String },
  youtube: { type: String },
  linkedIn: { type: String },
});

const Resume = mongoose.model("resumes", ResumeSchema);

export default Resume;
