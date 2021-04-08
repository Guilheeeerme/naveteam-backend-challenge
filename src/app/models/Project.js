import { Model, DataTypes } from "sequelize";

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        navers: DataTypes.ARRAY(DataTypes.INTEGER),
        user_id: DataTypes.INTEGER,
      },
      { sequelize, tableName: "Projects" }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Naver, {
      through: "NaverProjects",
      as: "navers_",
      foreignKey: "project_id",
    });
  }
}

export default Project;
