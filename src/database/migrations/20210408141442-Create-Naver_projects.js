module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("NaverProjects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      naver_id: {
        type: DataTypes.INTEGER,
        references: { model: "Navers", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: { model: "Projects", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("NaverProjects");
  },
};
