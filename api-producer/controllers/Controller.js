var { MessageBroker } = require("../../message-broker");

exports.get_posts = function (req, res) {
  var rabbitMQ = new MessageBroker();
  rabbitMQ.send("get-posts", Buffer.from("get-posts")).then(() => {
    res.json({
      response: "success",
    });
  });
};

exports.get_posts_comments = function (req, res) {
  var rabbitMQ = new MessageBroker();
  var payload = {
    id: req.params.postId,
  };

  rabbitMQ
    .send("get-posts-comments", Buffer.from(JSON.stringify(payload)))
    .then(() => {
      res.json({
        response: "success",
      });
    });
};

exports.create_post = function (req, res) {
  var body = req.body;
  var rabbitMQ = new MessageBroker();
  rabbitMQ.send("post-posts", Buffer.from(JSON.stringify(body))).then(() => {
    res.json({
      response: "success",
    });
  });
};

exports.update_post = function (req, res) {
  var body = req.body;
  body.id = req.params.postId;

  var rabbitMQ = new MessageBroker();
  rabbitMQ.send("put-posts", Buffer.from(JSON.stringify(body))).then(() => {
    res.json({
      response: "success",
    });
  });
};

exports.delete_post = function (req, res) {
  var rabbitMQ = new MessageBroker();

  var payload = {
    id: req.params.postId,
  };

  rabbitMQ
    .send("delete-posts", Buffer.from(JSON.stringify(payload)))
    .then(() => {
      res.json({
        response: "success",
      });
    });
};

exports.get_post_detail = function (req, res) {
  var rabbitMQ = new MessageBroker();
  var payload = {
    id: req.params.postId,
  };

  rabbitMQ
    .send("get-posts-detail", Buffer.from(JSON.stringify(payload)))
    .then(() => {
      res.json({
        response: "success",
      });
    });
};
