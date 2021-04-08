import { Router } from "express";

import UserController from "../app/controllers/UserController";
import AuthController from "../app/controllers/AuthController";

import ensureAuthenticated from "../app/middlewares/ensureAuthenticated";

import NaverController from "../app/controllers/NaverController";
import ProjectController from "../app/controllers/ProjectController";

import { findUserById } from "../app/middlewares/findUserById";

const routes = Router();

routes.post("/signup", UserController.store);
routes.post("/login", AuthController.store);

routes.use(ensureAuthenticated);

routes.get("/navers", NaverController.index);
routes.get("/navers/:naver_id", NaverController.show);
routes.post("/navers", findUserById, NaverController.store);
routes.put("/navers/:naver_id", findUserById, NaverController.update);
routes.delete("/navers/:naver_id", findUserById, NaverController.delete);

routes.get("/projects", ProjectController.index);
routes.get("/projects/:project_id", ProjectController.show);
routes.post("/projects", findUserById, ProjectController.store);
routes.put("/projects/:project_id", findUserById, ProjectController.update);
routes.delete("/projects/:project_id", findUserById, ProjectController.delete);

export default routes;
