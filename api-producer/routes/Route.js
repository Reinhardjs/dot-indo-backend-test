module.exports = function (app) {
  var controller = require("../controllers/Controller");

  app.route("/posts").get(controller.get_posts).post(controller.create_post);

  app
    .route("/posts/:postId")
    .get(controller.get_post_detail)
    .put(controller.update_post)
    .delete(controller.delete_post);

  app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not founddddd" });
  });
};
