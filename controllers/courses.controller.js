const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;
// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Course
  const courses = {
    dept: req.body.dept,
    coursenumber: req.body.coursenumber,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description,
    prerequisite: req.body.prerequisite,
    lab: req.body.lab,
    semester: req.body.semester,
  };
  // Save Course in the database
  Courses.create(courses)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course.",
      });
    });
};
// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  Courses.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
// Find a single Course with a course number
exports.findOne = (req, res) => {
  const coursenumber = req.params.coursenumber;
  Courses.findByPk(coursenumber)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find course with course number=${coursenumber}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with course number=" + coursenumber,
      });
    });
};
// Update a Course by the course number in the request
exports.update = (req, res) => {
  const coursenumber = req.params.coursenumber;
  Courses.update(req.body, {
    where: { coursenumber: coursenumber },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Course with course number=${coursenumber}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Course with course number=" + coursenumber,
      });
    });
};
// Delete a Course with the specified course number in the request
exports.delete = (req, res) => {
  const coursenumber = req.params.coursenumber;
  Courses.destroy({
    where: { coursenumber: coursenumber },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Course with course number=${coursenumber}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Course with course number=" + coursenumber,
      });
    });
};
// Delete all Course from the database.
exports.deleteAll = (req, res) => {
  Courses.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all courses.",
      });
    });
};
// Find all courses with a lab
exports.findAllLab = (req, res) => {
  Courses.findAll({ where: { lab: "true" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
