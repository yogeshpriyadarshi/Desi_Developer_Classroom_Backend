const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.send("Hello World!");
});
route.use("/auth", require("./auth/auth.routers"));
route.use("/users", require("./user/user.routers"));
route.use("/todolists", require("./todolist/todolist.routers"));
route.use("/subjects", require("./subject/subject.routes"));
route.use("/topics", require("./topic/topic.routes"));
route.use("/concepts", require("./concept/concept.routers"));
route.use("/questions", require("./question/route/question.routers"));

module.exports = route;
