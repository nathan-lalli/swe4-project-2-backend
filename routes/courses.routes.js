module.exports = (app) => {
  const courses = require("../controllers/courses.controller.js");
  var router = require("express").Router();
  // Create a new Course
  router.post("/", courses.create);
  // Retrieve all Courses
  router.get("/", courses.findAll);
  // Retrieve all Courses with a lab
  router.get("/lab", courses.findAllLab);
  // Retrieve a single Course with course number
  router.get("/:coursenumber", courses.findOne);
  // Update a Course with course number
  router.put("/:coursenumber", courses.update);
  // Delete a Course with course number
  router.delete("/:coursenumber", courses.delete);
  // Delete all Course
  router.delete("/", courses.deleteAll);
  //Retrieve all course based on a name
  router.get("/:name", courses.findName);
  //Retrieve based on a Department
  router.get("/:department", courses.findDept);
  //Retrieve based on course level
  router.get("/:level", courses.findLevel);
  //Retrieve based on course hours
  router.get("/:hours", courses.findHours);
  //Retrieve based on a course descripition
  router.get("/:description", courses.findDesc);
  //Retreive based on the semester a course is in
  router.get("/:semester", courses.findSemester);

  //The route that the API uses
  app.use("/course-t3/course", router);
};
