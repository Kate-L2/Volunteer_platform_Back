import Resume from "../../models/Resume.js";
import User from "../../models/User.js";
import parseObj from "../utils/parseObj.js";
import tryCatch from "../utils/tryCatch.js";

const createResumeController = tryCatch(async (req, res) => {
  const {
    nickName,
    city,
    categories,
    experience,
    avatarId,
    about,
    phoneNumber,
    socials,
  } = req.body;

  const newResume = await Resume.create({
    nickName,
    city,
    categories,
    experience,
    avatarId,
    about,
    phoneNumber,
    socials,
  });
  console.log(newResume);

  if (req?.user?.resume) {
    return res.status(400).send({
      message: "Резюме вже існує",
    });
  }

  newResume
    .save()
    .then((savedResume) => {
      const resumeId = savedResume._id;

      User.findOneAndUpdate(
        { _id: req.user._id },
        { resume: resumeId },
        { new: true }
      )
        .populate({
          path: "resumes",
          populate: [{ path: "city" }, { path: "categories" }],
        })
        .exec()
        .then((updatedUser) => {
          return res.status(200).send({
            message: "Резюме створене успішно!",
            result: updatedUser.resume,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).send({
            message: "Резюме не створене",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        message: "Резюме не створене",
      });
    });
});

export default createResumeController;
