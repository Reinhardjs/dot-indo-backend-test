const axios = require("axios");
const base_url =
  "http://my-json-server.typicode.com/reinhardjs/dot-indo-backend-test";

module.exports = function (rabbit, post, comment) {
  rabbit.subscribe("get-posts", (payload, ack) => {
    axios.get(base_url + "/posts").then((response) => {
      post
        .bulkCreate(response.data, {
          fields: ["id", "userId", "title", "body"],
          updateOnDuplicate: ["id"],
        })
        .then(() => {
          post.findAll().then((posts) => {
            console.log("Payload : \n", JSON.stringify(posts));
            ack();
          });
        });
    });
  });

  rabbit.subscribe("get-posts-detail", (payload, ack) => {
    var data = JSON.parse(payload.content.toString());

    axios.get(base_url + "/posts/" + data.id).then((response) => {
      console.log(response.data);
    });

    ack();
  });

  rabbit.subscribe("post-posts", (payload, ack) => {
    var data = JSON.parse(payload.content.toString());

    axios
      .post(base_url + "/posts", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        post.create(data).then((data) => {
          console.log(data.dataValues);
          ack();
        });
      });
  });

  rabbit.subscribe("put-posts", (payload, ack) => {
    var data = JSON.parse(payload.content.toString());

    axios
      .put(base_url + "/posts/" + data.id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        post
          .update(data, { where: { id: data.id } })
          .then((affectedRows) => {
            return post.findOne({ where: { id: data.id } });
          })
          .then((data) => {
            console.log(data.dataValues);
            ack();
          });
      });
  });

  rabbit.subscribe("delete-posts", (payload, ack) => {
    var data = JSON.parse(payload.content.toString());

    axios.delete(base_url + "/posts/" + data.id).then(() => {
      post.findOne({ where: { id: data.id } }).then((dataBeingDeleted) => {
        post.destroy({ where: { id: data.id } }).then((affectedRows) => {
          console.log(dataBeingDeleted.dataValues);
          ack();
        });
      });
    });
  });
};
