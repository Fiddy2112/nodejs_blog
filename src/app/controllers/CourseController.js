const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    // req.query.slug = req.params.slug;
    // res.send("CORSE DETAIL " + req.params.slug);
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /courses/store
  store(req, res, next) {
    const fromData = req.body;
    fromData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAg6bizs3d3bZHQPtx5EQDtKl60A`;
    const course = new Course(fromData);
    course
      .save()

      .then(() => {
        res.redirect("/");
      })
      .catch(next);
  }

  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) => {
        res.render("courses/edit", { course: mongooseToObject(course) });
      })
      .catch(next);
  }
}

module.exports = new CourseController();
