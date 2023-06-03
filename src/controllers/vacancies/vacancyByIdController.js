import Vacancy from "../../models/Vacancy.js";
import parseObj from "../utils/parseObj.js";
import tryCatch from "../utils/tryCatch.js";

const vacancyByIdController = tryCatch(async (req, res) => {
  const vacancyId = req.params.id;
  const userId = req?.user?._id;

  Vacancy.findById(vacancyId)
    .populate("city")
    .populate("categories")
    .populate({
      path: "appliedApplications",
      populate: [{ path: "city" }, { path: "categories" }],
    })
    .then((vacancy) => {
      if (!vacancy) {
        return res.status(404).send({
          message: "Вакансію не знайдено",
        });
      }

      const result = {
        ...parseObj(vacancy),
        alreadyApplicated: false,
      };

      // change field alreadyApplicated on true if user has already sent application
      //TODO check on date of died application
      const applicationDeadlineIsAlready =
        new Date().getTime() > new Date(vacancy.applicationDeadline).getTime();

      if (
        (vacancy.appliedApplications.length > 0 &&
          vacancy.appliedApplications.find(
            (appliedApplication) =>
              appliedApplication.user.toString() === userId
          )) ||
        applicationDeadlineIsAlready
      ) {
        result.alreadyApplicated = true;
      }

      return res.status(200).send({
        message: "Вакансію отримано. Успіх",
        result,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Вакансію не знайдено",
      });
    });
});

export default vacancyByIdController;
