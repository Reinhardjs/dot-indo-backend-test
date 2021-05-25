const Sequelize = require("sequelize"); //Database ORM

//Connect to database
const sequelize = new Sequelize("mydb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

var post = require("./consumer/models/Post")(sequelize);
var comment = require("./consumer/models/Comment")(sequelize);

var { MessageBroker } = require("./message-broker");
var rabbit = new MessageBroker();
var subscribe = require("./consumer/subscribe");
subscribe(rabbit, post, comment); //subscribing
