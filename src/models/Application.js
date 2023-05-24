import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
  fullName: { type: String, min: 3, max: 15, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, min: 5, max: 50, required: true },
  experience: { type: String, required: true },
  // avatar: {
  //   data: Buffer,
  //   contentType: String,
  // },
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
  city: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
});

const Application = mongoose.model("applications", ApplicationSchema);

export default Application;
