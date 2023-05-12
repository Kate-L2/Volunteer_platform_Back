import tryCatch from "./utils/tryCatch.js";

const currentUser = tryCatch(async (req, res) => {
  if (!req.user) {
    res.status(404).send({
      message: "User doesn`t exist",
    });
  } else {
    res.status(200).send({
      message: "Current user successful",
      result: req.user,
    });
  }
});

export default currentUser;
