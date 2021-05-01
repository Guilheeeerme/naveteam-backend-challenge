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
      },
      { sequelize, tableName: "navers" }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "naver_id",
      through: "user_navers",
      as: "users",
    });
  }
}

export default Naver;
