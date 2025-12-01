"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Records", "date", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("Records", {
      fields: ["userId", "gameId", "date"],
      type: "unique",
      name: "unique_user_game_date",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Records", "date", {
      type: Sequelize.DATE,
    });

    await queryInterface.removeConstraint("Records", "unique_user_game_date");
  },
};
