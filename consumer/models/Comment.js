const Sequelize = require("sequelize"); //Database ORM

//Define models
module.exports = function (sequelize) {
  return sequelize.define(
    "comment",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: Sequelize.INTEGER,
      name: Sequelize.STRING,
      email: Sequelize.STRING,
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
