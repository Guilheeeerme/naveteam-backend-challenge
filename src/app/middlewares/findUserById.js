import User from "../models/User";
import { AppError } from "../errors/AppError";

async function findUserById(request, response, next) {
  const { user_id } = request;

  const user = await User.findByPk(user_id);

  if (!user) {
    throw new AppError("", 404);
  }

  request.user = user;

  return next();
}

export { findUserById };
