import User from "../models/User";

class UserController {
  async show(request, response) {
    const users = await User.findAll();

    return response.status(201).json(users);
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export default new UserController();
