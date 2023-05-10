import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    dbName: "VolunteerPlatform",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.once("open", () => console.log("Connected to DB"));
  db.on("error", (error) => console.log(error));
};

export default dbConnect;
