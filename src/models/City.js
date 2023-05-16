import mongoose from "mongoose";

const CitySchema = mongoose.Schema({
  name: { type: String, required: true },
});

const City = mongoose.model("cities", CitySchema);

export default City;
