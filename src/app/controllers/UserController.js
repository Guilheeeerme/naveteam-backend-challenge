import User from "../models/User";
import { AppError } from "../errors/AppError";

class UserController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new AppError("User already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return response.status(201).json({ id: user.id, name, email });
  }
}

export default new UserController();
