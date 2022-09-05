const { SqlError } = require("mariadb");

module.exports = (sequelize, Sequelize) => {
  const Courses = sequelize.define("courses", {
    dept: {
      type: Sequelize.STRING,
    },
    coursenumber: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    hours: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    prerequisite: {
      type: Sequelize.STRING,
    },
    lab: {
      type: Sequelize.STRING,
    },
    semester: {
      type: Sequelize.STRING,
    },
  });
  return Courses;
};
