"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "Projeto 1",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Projeto 2",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Projeto 3",
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Projeto 4",
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
