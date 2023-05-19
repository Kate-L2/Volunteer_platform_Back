import mongoose from "mongoose";

const VacancySchema = mongoose.Schema({
  title: { type: String, min: 10, max: 30, required: true },
  organizators: { type: String, min: 10, max: 100, required: true },
  category: { type: Array, min: 1, max: 4, required: true },
  email: { type: String, min: 5, max: 50, required: true, unique: true },
  startEventDate: { type: Date, required: true },
  endEventDate: { type: Date, required: true },
  applicationDeadline: { type: Date, required: true },
  online: { type: Boolean },
  city: { type: String },
  address: { type: String, min: 3, max: 100 },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: { type: String, min: 100, required: true },
  website: { type: String },
  socials: {
    facebook: { type: String },
    instagram: { type: String },
    telegram: { type: String },
    youtube: { type: String },
    linkedIn: { type: String },
  },
  appliedApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "applications",
    },
  ],
});

const Vacancy = mongoose.model("vacancies", VacancySchema);

export default Vacancy;
