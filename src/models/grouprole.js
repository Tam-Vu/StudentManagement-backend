'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroupRole.belongsTo(models.GroupUser, {
        foreignKey: "groupId"
      });
      GroupRole.belongsTo(models.Role, {
        foreignKey: "roleId"
      });
    }
  }
  GroupRole.init({
    
  }, {
    sequelize,
    modelName: 'GroupRole',
  });
  return GroupRole;
};