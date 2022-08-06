const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    // res.json(res.locals._sort);

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);

    // Course.countDocumentsDeleted()
    //   .then((deleteCount) => {
    //     console.log(deleteCount);
    //   })
    //   .catch(() => {});
    // Course.find({})
    //   .then((course) => {
    //     res.render("me/stored-courses", {
    //       courses: mutipleMongooseToObject(course),
    //     });
    //   })
    //   .catch(next);
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((course) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(course),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
