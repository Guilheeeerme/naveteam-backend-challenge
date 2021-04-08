import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";
import { AppError } from "../errors/AppError";

export default async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Token missing", 401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, authConfig.secret);

    const { id } = data;

    request.user_id = id;

    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
};
