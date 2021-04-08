import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      { sequelize, tableName: "Users" }
    );

    this.addHook("beforeSave", async (user) => {
      const SALT = 10;

      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, SALT);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsToMany(models.Naver, {
      through: "UserNavers",
      as: "navers",
      foreignKey: "user_id",
    });
  }
}

export default User;
