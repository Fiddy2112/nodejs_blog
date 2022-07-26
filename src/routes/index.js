const newsRouter = require("./news");
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");

function route(app) {
  //main
  //   app.get("/", function (req, res) {
  //     res.render("home");
  //   });

  //   app.get("/news", function (req, res) {
  //     res.render("news");
  //   });

  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/search", newsRouter);

  //main
  app.use("/", siteRouter);

  // Action --> Dispatcher --> Function handle

  //   app.get("/search", (req, res) => {
  //     res.render("search");
  // console.log(req.query); khi su dung query parameter thi phai dung req.query
  //   });

  //   app.post("/search", (req, res) => {
  // console.log(req.body); khi su dung form thi dung req.body
  // console.log(req.body);
  // res.send("");
  //   });
}

module.exports = route;
