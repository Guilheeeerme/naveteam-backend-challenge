"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "Navers",
      [
        {
          name: "Guilherme",
          birthdate: "1997-07-21",
          admission_date: "2020-04-08",
          job_role: "Desenvolvedor",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "John doe",
          birthdate: "1990-05-13",
          admission_date: "2019-03-10",
          job_role: "Desenvolvedor",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ragnar",
          birthdate: "1996-02-23",
          admission_date: "2018-11-12",
          job_role: "Desenvolvedor",
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Sara",
          birthdate: "1994-09-03",
          admission_date: "2017-07-22",
          job_role: "Desenvolvedora",
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Navers", null, {});
  },
};
