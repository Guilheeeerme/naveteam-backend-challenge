import Sequelize from "sequelize";

import databaseConfig from "../config/database";

import User from "../app/models/User";
import Naver from "../app/models/Naver";
import Project from "../app/models/Project";

const models = [User, Naver, Project];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
