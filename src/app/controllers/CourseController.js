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
    const fromData = { ...req.body };
    fromData.image = `https://i.ytimg.com/vi/${fromData.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAg6bizs3d3bZHQPtx5EQDtKl60A`;
    const course = new Course(fromData);
    course
      .save()

      .then(() => {
        res.redirect("/me/stored/courses");
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

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  //[DELETE] /courses/:id/force
  ForceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => {
            res.redirect("back");
          })
          .catch(next);
        break;

      default:
        res.json({ message: "Action is invalid !" });
        break;
    }
  }

  //[POST] /courses/trash-handle-form-actions
  trashHandleFormActions(req, res, next) {
    switch (req.body.action) {
      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => {
            res.redirect("back");
          })
          .catch(next);
        break;

      case "destroy":
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => {
            res.redirect("back");
          })
          .catch(next);
        break;

      default:
        res.json({ message: "Action is invalid !" });
        break;
    }
  }
}

module.exports = new CourseController();
