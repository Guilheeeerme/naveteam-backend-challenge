import { Model, DataTypes } from "sequelize";

class Naver extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        birthdate: DataTypes.DATEONLY,
        admission_date: DataTypes.DATEONLY,
        job_role: DataTypes.STRING,
        projects: DataTypes.ARRAY(DataTypes.INTEGER),
        user_id: DataTypes.INTEGER,
      },
      { sequelize, tableName: "Navers" }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Project, {
      through: "NaverProjects",
      as: "projects_",
      foreignKey: "naver_id",
    });
  }
}

export default Naver;
