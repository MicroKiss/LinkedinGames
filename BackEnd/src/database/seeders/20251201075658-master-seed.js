"use strict";

const { faker, fa } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.person.firstName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      });
    }
    await queryInterface.bulkInsert("Users", users, {});
    const games = [];

    for (let i = 0; i < 5; i++) {
      games.push({
        name: faker.lorem.word(),
      });
    }

    await queryInterface.bulkInsert("Games", games, {});

    const records = [];
    const usedCombos = new Set();
    while (records.length < 20) {
      const userId = faker.number.int({ min: 1, max: 10 });
      const gameId = faker.number.int({ min: 1, max: 5 });
      const date = faker.date.recent({ days: 30 }).toISOString().split("T")[0];
      const time = faker.number.int({ min: 5, max: 300 });
      const comboKey = `${userId}-${gameId}-${date}`;

      if (!usedCombos.has(comboKey)) {
        usedCombos.add(comboKey);
        records.push({
          userId,
          gameId,
          date,
          time,
        });
      }
    }

    await queryInterface.bulkInsert("Records", records, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Records", null, {});
    await queryInterface.bulkDelete("Games", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
