import mongoose from "mongoose";

const VacancySchema = mongoose.Schema({
  title: { type: String, min: 10, max: 30, required: true },
  organizators: { type: String, min: 10, max: 100, required: true },
  email: { type: String, min: 5, max: 50, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  applicationDeadline: { type: Date, required: true },
  online: { type: Boolean },
  address: { type: String, min: 3, max: 100 },
  //TODO
  // img: {
  //   data: { type: Buffer, required: true },
  //   contentType: { type: String, required: true },
  // },
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
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
  city: { type: mongoose.Schema.Types.ObjectId, ref: "cities" },
});

const Vacancy = mongoose.model("vacancies", VacancySchema);

export default Vacancy;
