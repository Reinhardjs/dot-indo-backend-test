const Sequelize = require("sequelize"); //Database ORM

//Define models
module.exports = function (sequelize) {
  return sequelize.define(
    "post",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: Sequelize.INTEGER,
      title: Sequelize.STRING,
      body: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      //prevent sequelize transform table name into plural
      freezeTableName: true,
    }
  );
};
