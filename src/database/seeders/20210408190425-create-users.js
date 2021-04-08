"use strict";

const { hash } = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          email: "admin@mail.com",
          password_hash: await hash("1234", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Guilherme",
          email: "guilherme@mail.com",
          password_hash: await hash("1234", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
