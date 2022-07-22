const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    // res.json({
    //   name: "test",
    // });

    // Course.find({}, (err, courses) => {
    //   if (!err) {
    //     res.json(courses);
    //     return;
    //   }
    //   res.status(400).json({ error: "ERROR" });
    // });

    Course.find({})
      .then((courses) => {
        res.render("home", { courses: mutipleMongooseToObject(courses) });
      })
      .catch(next);

    // res.render("home");
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
