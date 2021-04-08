import Naver from "../models/Naver";
import Project from "../models/Project";

import convertDate from "../../utils/convertDate";
import { AppError } from "../errors/AppError";

class NaverController {
  async index(request, response) {
    const { name, birthdate, admission_date } = request.query;

    let navers = await Naver.findAll({
      attributes: ["id", "name", "birthdate", "admission_date", "job_role"],
    });

    if (name) {
      const naversByName = navers.filter((naver) => naver.name === name);
      return response.status(200).json(naversByName);
    }

    if (birthdate) {
      const naversByBirthdate = navers.filter(
        (naver) => convertDate(naver.birthdate) === birthdate
      );
      return response.status(200).json(naversByBirthdate);
    }

    if (admission_date) {
      const naversByAdmission_date = navers.filter(
        (naver) => convertDate(naver.admission_date) === admission_date
      );
      return response.status(200).json(naversByAdmission_date);
    }

    return response.status(200).json(navers);
  }

  async show(request, response) {
    const { naver_id } = request.params;

    let naver = await Naver.findOne({
      attributes: ["id", "name", "birthdate", "admission_date", "job_role"],
      include: [
        {
          model: Project,
          as: "projects_",
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
      ],
      where: { id: naver_id },
    });

    return response.status(200).json(naver);
  }

  async store(request, response) {
    const { user } = request;

    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;

    const naver = await Naver.create({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
      user_id: user.id,
    });

    if (projects && projects.length > 0) {
      naver.setProjects_(projects);
    }

    return response.status(201).json({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });
  }

  async update(request, response) {
    const { user } = request;
    const { naver_id } = request.params;
    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;

    const naver = await Naver.findByPk(naver_id);

    if (naver.user_id !== user.id) {
      throw new AppError("You are not authorized to update this Naver", 401);
    }

    await naver.update({
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    });

    if (projects && projects.length > 0) {
      naver.setProjects_(projects);
    }

    return response
      .status(200)
      .json({ name, birthdate, admission_date, job_role, projects });
  }

  async delete(request, response) {
    const { user } = request;
    const { naver_id } = request.params;

    const naver = await Naver.findByPk(naver_id);

    if (!naver) {
      throw new AppError("", 404);
    }

    if (naver.user_id !== user.id) {
      throw new AppError("You are not authorized to delete this Naver", 401);
    }

    await naver.destroy();

    return response.status(204).send();
  }
}

export default new NaverController();
