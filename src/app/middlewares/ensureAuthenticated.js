import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

export default async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: "Token missing" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = await jwt.verify(token, authConfig.secret);

    const { id } = data;

    request.user_id = id;

    return next();
  } catch {
    return response.status(401).json({ message: "Invalid token!" });
  }
};
