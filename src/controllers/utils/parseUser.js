import parseObj from "./parseObj.js";

export default (user) => {
  const userCopy = parseObj(user);
  delete userCopy.password;
  delete userCopy.__v;

  return userCopy;
};
