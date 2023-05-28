import Resume from "../../models/Resume.js";
import tryCatch from "../utils/tryCatch.js";

const editResumeController = tryCatch(async (req, res) => {
  if (!req?.user?.resume) {
    return res.status(404).send({
      message: "Резюме не знайдено",
    });
  }

  const {
    nickName,
    experience,
    avatarId,
    about,
    phoneNumber,
    socials,
    city,
    categories,
  } = req.body;

  const newResume = await Resume.findOneAndUpdate(
    { _id: req.user.resume },
    {
      nickName,
      experience,
      avatarId,
      about,
      phoneNumber,
      socials,
      city,
      categories,
    },
    { new: true }
  )
    .populate("city")
    .populate("categories")
    .exec()
    .then((updatedResume) => {
      if (!updatedResume) {
        return res.status(400).send({
          message: "Оновлене резюме не знайдено",
          result: updatedResume,
        });
      }

      return res.status(200).send({
        message: "Резюме оновлено успішно!",
        result: updatedResume,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).send({
        message: "Помилка в оновленні резюме",
        result: updatedResume,
      });
    });
});

export default editResumeController;
