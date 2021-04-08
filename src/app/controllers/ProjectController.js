import Project from "../models/Project";
import Naver from "../models/Naver";

import { AppError } from "../errors/AppError";

class ProjectController {
  async index(request, response) {
    const { name } = request.query;

    const projects = await Project.findAll({
      attributes: ["id", "name"],
    });

    if (name) {
      const projectsByName = projects.filter(
        (project) => project.name === name
      );
      return response.status(200).json(projectsByName);
    }

    return response.status(200).json(projects);
  }

  async show(request, response) {
    const { project_id } = request.params;

    let project = await Project.findOne({
      attributes: ["id", "name"],
      include: [
        {
          model: Naver,
          as: "navers_",
          through: { attributes: [] },
          attributes: ["id", "name", "birthdate", "admission_date", "job_role"],
        },
      ],
      where: { id: project_id },
    });

    return response.status(200).json(project);
  }

  async store(request, response) {
    const { user } = request;
    const { name, navers } = request.body;

    const project = await Project.create({
      name,
      navers,
      user_id: user.id,
    });

    if (navers && navers.length > 0) {
      project.setNavers_(navers);
    }

    return response.status(201).json(project);
  }

  async update(request, response) {
    const { user } = request;
    const { project_id } = request.params;
    const { name, navers } = request.body;

    const project = await Project.findOne({ where: { id: project_id } });

    if (project.user_id !== user.id) {
      throw new AppError("You are not authorized to update this Project", 401);
    }

    await project.update({
      name,
      navers,
    });

    if (navers && navers.length > 0) {
      project.setNavers_(navers);
    }

    return response.status(200).json({ name, navers });
  }

  async delete(request, response) {
    const { user } = request;
    const { project_id } = request.params;

    const project = await Project.findOne({ where: { id: project_id } });

    if (!project) {
      throw new AppError("", 404);
    }

    if (project.user_id !== user.id) {
      throw new AppError("You are not authorized to delete this Project", 401);
    }

    await project.destroy();

    return response.status(204).send();
  }
}

export default new ProjectController();
