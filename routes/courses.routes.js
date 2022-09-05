module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();
  // Create a new Course
  router.post("/", courses.create);
  // Retrieve all Courses
  router.get("/", courses.findAll);
  // Retrieve all published Courses
  router.get("/lab", courses.findAllLab);
  // Retrieve a single Course with course number
  router.get("/:coursenumber", courses.findOne);
  // Update a Course with course number
  router.put("/:coursenumber", courses.update);
  // Delete a Course with course number
  router.delete("/:coursenumber", courses.delete);
  // Delete all Course
  router.delete("/", courses.deleteAll);
  app.use("/api/courses", router);
};
