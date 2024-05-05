'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class params extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  params.init({
    paramName: DataTypes.STRING,
    paramValue: DataTypes.INTEGER,
    paramNote: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'params',
  });
  return params;
};