const Course = require("../models/Course");

class SiteController {
  // [GET] /
  index(req, res) {
    // res.json({
    //   name: "test",
    // });

    Course.find({}, (err, courses) => {
      if (!err) {
        res.json(courses);
        return;
      }
      res.status(400).json({ error: "ERROR" });
    });

    // res.render("home");
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
