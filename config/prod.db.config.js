module.exports = {
  HOST: "project2.eaglesoftwareteam.com",
  port: 3303,
  USER: "t32022",
  PASSWORD: "cs@oc2022t3",
  DB: "p2-t3-courses",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
