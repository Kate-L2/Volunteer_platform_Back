import Resume from "../../models/Resume.js";
import parseObj from "../utils/parseObj.js";
import tryCatch from "../utils/tryCatch.js";

const resumeByIdController = tryCatch(async (req, res) => {
  const resumeId = req.params.id;

  Resume.findById(resumeId)
    .populate("city")
    .populate("categories")
    .then((resume) => {
      console.log(resume);
      if (!resume) {
        return res.status(404).send({
          message: "Резюме не знайдено",
        });
      }

      return res.status(200).send({
        message: "Резюме отримано. Успіх",
        result: resume,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Резюме не знайдено",
      });
    });
});

export default resumeByIdController;
