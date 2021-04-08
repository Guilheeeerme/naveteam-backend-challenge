import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

class AuthController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return response
        .status(401)
        .json({ message: "Email or password incorrect!" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Email or password incorrect!" });
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
