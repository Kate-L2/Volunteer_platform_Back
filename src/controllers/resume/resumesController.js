import Resume from "../../models/Resume.js";
import tryCatch from "../utils/tryCatch.js";

const resumeByIdController = tryCatch(async (req, res) => {
  const filters = {};

  const currentResumeId = req?.user?.resume;
  if (currentResumeId) {
    filters._id = { $ne: currentResumeId };
  }

<<<<<<< HEAD
  Resume
    .find(filters)
    .populate("city")
    .populate("categories")
    .then((resumes) => {
      console.log(resumes);
=======
  Resume.find(filters)
    .populate("city")
    .populate("categories")
    .then((resumes) => {
>>>>>>> db9a4773834057efa830cdaa2caf6501a2515a89
      if (!resumes || resumes.length === 0) {
        return res.status(404).send({
          message: "Резюме не знайдені",
        });
      }

      return res.status(200).send({
<<<<<<< HEAD
        message: "Резюме отримані. Успіх",
=======
        message: "Резюме отримано. Успіх",
>>>>>>> db9a4773834057efa830cdaa2caf6501a2515a89
        result: resumes,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Резюме не знайдені",
      });
    });
});

export default resumeByIdController;
