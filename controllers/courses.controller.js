const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Courses } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Courses, totalPages, currentPage };
};

// Create and Save a new Course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.coursenumber) {
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
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Courses.findAndCountAll({ limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
// Find a single Course with a course number
exports.findOne = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const coursenumber = req.params.coursenumber;
  Courses.findAndCountAll({
    where: { coursenumber: coursenumber },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
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
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Courses.findAndCountAll({ where: { lab: "true" }, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
//Find course based on a name
exports.findName = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const name = req.params.name;
  Courses.findAndCountAll({
    where: { [Op.substring]: [{ name: name }] },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with name=${name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with name=" + name,
      });
    });
};
//Find course based on a department
exports.findDept = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const dept = req.params.dept;
  Courses.findAndCountAll({
    where: { dept: dept },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with Department=${dept}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Department=" + dept,
      });
    });
};
//Find course based on the level
exports.findLevel = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const level = req.params.level;
  Courses.findAndCountAll({
    where: { level: level },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with Level=${level}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Level=" + level,
      });
    });
};
//Find course based on the hours
exports.findHours = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const hours = req.params.hours;
  Courses.findAndCountAll({
    where: { hours: hours },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with Hours=${hours}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Hours=" + hours,
      });
    });
};
//Find course based on a description
exports.findDesc = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const description = req.params.description;
  Courses.findAndCountAll({
    where: { [Op.substring]: [{ description: description }] },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with Descritpion=${description}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with Description=" + description,
      });
    });
};
//Find course based on a semester
exports.findSemester = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const semester = req.params.semester;
  Courses.findAndCountAll({
    where: { [Op.substring]: [{ semester: semester }] },
    limit,
    offset,
  })
    .then((data) => {
      if (data) {
        const response = getPagingData(data, page, limit);
        res.send(response);
      } else {
        res.status(404).send({
          message: `Cannot find course with semester=${semester}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Course with semester=" + semester,
      });
    });
};
