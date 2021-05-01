import Naver from "../models/Naver";
import User from "../models/User";
import Project from "../models/Project";

import convertDate from "../../utils/convertDate";
import { AppError } from "../errors/AppError";

class NaverController {
  async index(request, response) {
    const { user_id } = request;
    const { name, birthdate, admission_date } = request.query;

    const user = await User.findByPk(user_id, {
      include: {
        association: "navers",
        attributes: [
          "id",
          "name",
          "birthdate",
          "admission_date",
          "job_role",
          "projects",
        ],
        through: {
          attributes: [],
        },
      },
    });

    if (name) {
      const naversByName = user.navers.filter((naver) => naver.name === name);
      return response.json(naversByName);
    }

    if (birthdate) {
      const naversByBirthdate = user.navers.filter(
        (naver) => convertDate(naver.birthdate) === birthdate
      );
      return response.json(naversByBirthdate);
    }

    if (admission_date) {
      const naversByAdmission_date = user.navers.filter(
        (naver) => convertDate(naver.admission_date) === admission_date
      );
      return response.json(naversByAdmission_date);
    }

    return response.json(user.navers);
  }

  async show(request, response) {
    const { user_id } = request;
    const { id } = request.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: "navers",
        attributes: [
          "id",
          "name",
          "birthdate",
          "admission_date",
          "job_role",
          "projects",
        ],
        where: { id },
        through: {
          attributes: [],
        },
      },
    });

    if (!user) {
      return response.status(404).json({ error: "Naver not found" });
    }

    return response.status(200).json(user.navers);
  }

  async store(request, response) {
    const { user } = request;

    // prettier-ignore
    const { name, birthdate, admission_date, job_role, projects } = request.body;

    const naver = await Naver.create({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });

    await user.addNaver(naver);

    return response.json(naver);
  }

  async update(request, response) {
    const { user_id } = request;
    const { id } = request.params;

    // prettier-ignore
    const { name, birthdate, admission_date, job_role, projects } = request.body;

    const naver = await Naver.findOne({ where: { id } });

    if (!naver) {
      throw new AppError("", 404);
    }

    const userNaver = await User.findByPk(user_id, {
      include: {
        association: "navers",
        attributes: [],
        where: { id },
        through: {
          attributes: [],
        },
      },
    });

    if (!userNaver) {
      throw new AppError("You are not authorized to delete this Naver", 401);
    }

    await naver.update({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });

    // prettier-ignore
    return response.json({name, birthdate, admission_date, job_role, projects });
  }

  async delete(request, response) {
    const { user, user_id } = request;
    const { id } = request.params;

    const naver = await Naver.findOne({ where: { id } });

    if (!naver) {
      throw new AppError("", 404);
    }

    const userNaver = await User.findByPk(user_id, {
      include: {
        association: "navers",
        attributes: [],
        where: { id },
        through: {
          attributes: [],
        },
      },
    });

    if (!userNaver) {
      throw new AppError("You are not authorized to delete this Naver", 401);
    }

    await user.removeNaver(naver);
    await naver.destroy();

    return response.status(204).send();
  }
}

export default new NaverController();
