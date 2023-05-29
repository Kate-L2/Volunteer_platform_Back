import mongoose from "mongoose";

const ResumeSchema = mongoose.Schema({
  nickName: { type: String, min: 3, max: 15, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
  experience: { type: String, required: true },
  avatarId: {
    type: Number,
    required: true,
  },
  about: { type: String, min: 100, required: true },
  phoneNumber: { type: String, required: true },
  socials: {
    facebook: { type: String },
    instagram: { type: String },
    telegram: { type: String },
    youtube: { type: String },
    linkedIn: { type: String },
  },
});

const Resume = mongoose.model("resumes", ResumeSchema);

export default Resume;
