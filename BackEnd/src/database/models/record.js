'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.Game, { foreignKey: 'gameId' });
      Record.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Record.init({
    gameId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Record',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'gameId', 'date']
      }]
  });
  return Record;
};