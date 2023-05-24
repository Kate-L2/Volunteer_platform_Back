import Resume from "../../models/Resume.js";
import User from "../../models/User.js";
import tryCatch from "../utils/tryCatch.js";

const deleteResumeController = tryCatch(async (req, res) => {
  if (!req?.user?.resume) {
    return res.status(400).send({
      message: "Резюме не існує",
    });
  }

  const userId = req.user._id;
  const resumeId = req.user.resume;

  User.findByIdAndUpdate(userId, { $unset: { resume: 1 } }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(400)
          .json({ message: "Не вдалося знайти користувача" });
      }

      return Resume.findByIdAndRemove(resumeId)
        .populate("city")
        .populate("categories")
        .then((removedResume) => {
          if (!removedResume) {
            return res.status(404).json({ error: "Резюме не знайдене" });
          }

          return res.status(200).json({
            message: "Резюме успішно видалене",
            result: removedResume,
          });
        })
        .catch(() => {
          return res.status(500).json({ error: "Не вдалося видалити резюме" });
        });
    })
    .catch(() => {
      return res.status(500).json({ error: "Не вдалося оновити користувача" });
    });
});

export default deleteResumeController;
