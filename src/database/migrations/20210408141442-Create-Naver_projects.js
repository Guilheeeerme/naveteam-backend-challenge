module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_navers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      naver_id: {
        type: Sequelize.INTEGER,
        references: { model: "navers", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("user_navers");
  },
};
