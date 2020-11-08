'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrizeList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PrizeList.init({
    prize: DataTypes.STRING,
    name: DataTypes.STRING,
    number: DataTypes.NUMBER,
    imgurl: DataTypes.STRING,
    is_deleted: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'PrizeList',
  });
  return PrizeList;
};