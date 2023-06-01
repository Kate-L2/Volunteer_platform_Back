import User from "../../models/User.js";
import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const deleteVacancyController = tryCatch(async (req, res) => {
  if (!req?.user?.vacancies) {
    return res.status(400).send({
      message: "Вакансії не існують",
    });
  }

  const userId = req.user._id;
  const vacancyId = req.body.id;

  if (!vacancyId) {
    return res.status(400).json({ message: "Необхідно передати id вакансії" });
  }

  // check user's vacancies
  if (
    !req.user?.vacancies.find(
      (vacancy) => vacancy.toString() === vacancyId.toString()
    )
  ) {
    return res
      .status(403)
      .json({ message: "Недостатньо прав для редагування" });
  }

  User.findByIdAndUpdate(
    userId,
    { $pull: { vacancies: vacancyId } },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(400)
          .json({ message: "Не вдалося знайти користувача" });
      }

      return (
        Vacancy.findByIdAndRemove(vacancyId)
          .populate("city")
          .populate("categories")
          .populate("categories")
          // TODO
          // .populate("appliedApplications");
          .then((removedVacancy) => {
            if (!removedVacancy) {
              return res.status(404).json({ error: "Вакансія не знайдена" });
            }
            // TODO: видаляти також заявки при видаленні вакансії
            return res.status(200).json({
              message: "Вакансія успішно видалена",
              result: removedVacancy,
            });
          })
          .catch(() => {
            return res
              .status(500)
              .json({ error: "Не вдалося видалити вакансію" });
          })
      );
    })
    .catch(() => {
      return res.status(500).json({ error: "Не вдалося оновити користувача" });
    });
});

export default deleteVacancyController;
