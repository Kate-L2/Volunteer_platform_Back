import Resume from "../../models/Resume.js";
import parseObj from "../utils/parseObj.js";
import tryCatch from "../utils/tryCatch.js";

const resumeController = tryCatch(async (req, res) => {
  if (req.user.resume) {
    const resume = await Resume.findById(req.user.resume)
      .populate("city")
      .populate("categories");

    return res.status(200).send({
      message: "Моє резюме. Успіх",
      result: parseObj(resume),
    });
  } else {
    return res.status(404).send({
      message: "Резюме не знайдено",
    });
  }
});

export default resumeController;
