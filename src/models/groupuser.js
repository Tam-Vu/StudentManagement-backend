'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupUser.hasMany(models.User, {
        foreignKey: 'userId'
      });
      GroupUser.belongsToMany(models.Role, { through: "GroupRole" });
    }
  }
  GroupUser.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupUser',
  });
  return GroupUser;
};