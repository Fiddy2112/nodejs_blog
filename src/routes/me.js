const express = require("express");
const router = express.Router();

meController = require("../app/controllers/MeController");

router.get("/stored/courses", meController.storedCourses);

module.exports = router;
