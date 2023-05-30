import Resume from "../../models/Resume.js";
import tryCatch from "../utils/tryCatch.js";

const resumeByIdController = tryCatch(async (req, res) => {
  const filters = {};

  // filters
  const currentResumeId = req?.user?.resume;
  if (currentResumeId) {
    filters._id = { $ne: currentResumeId };
  }

  if (req.query?.city) {
    filters.city = req.query.city;
  }

  if (req.query?.categories) {
    filters.categories = { $in: req.query.categories.split(",") };
  }

  if (req.query?.search) {
    filters.nickName = { $regex: req.query.search, $options: "i" };
  }

  if (req.query?.experience) {
    filters.experience = { $regex: req.query.experience, $options: "i" };
  }

  // find
  Resume.find(filters)
    .populate("city")
    .populate("categories")
    .then((resumes) => {
      if (!resumes || resumes.length === 0) {
        return res.status(404).send({
          message: "Резюме не знайдені",
          result: [],
        });
      }

      return res.status(200).send({
        message: "Резюме отримані. Успіх",
        result: resumes,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Резюме не знайдені",
        result: [],
      });
    });
});

export default resumeByIdController;
