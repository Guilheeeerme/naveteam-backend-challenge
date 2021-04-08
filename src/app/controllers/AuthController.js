import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";
import { AppError } from "../errors/AppError";

class AuthController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.json({
      id: user.id,
      name: user.name,
      token,
    });
  }
}

export default new AuthController();
