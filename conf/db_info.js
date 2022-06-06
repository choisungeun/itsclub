var mysql = require("mysql");
var os = require("os"); //호스트 이름을 가져오기 위한 모듈

var dbconnInfo = {
  dev: {
    host: "localhost",
    port: "3306",
    user: "itsclub",
    password: "asdflkjlkj1!",
    database: "itsclub",
    timezone: "Asia/Seoul",
    multipleStatements: true,
  },
  real: {
    host: "10.0.0.1 ",
    port: "3306",
    user: "maiders",
    password: "asdflkjlkj1!",
    database: "maiders",
    timezone: "Asia/Seoul",
    multipleStatements: true,
  },
};

var dbconnection = {
  init: function () {
    var hostname = os.hostname();

    if (hostname === "SUNSAMSUNG" || hostname === "DESKTOP-0IAP0QC") {
      return mysql.createConnection(dbconnInfo.dev); //로컬개발환경
    } else {
      return mysql.createConnection(dbconnInfo.real); //cafe24 서버환경
    }
  },

  dbopen: function (con) {
    con.connect(function (err) {
      if (err) {
        console.error("mysql connection error : " + err);
      } else {
        console.info("mysql connection successfully.");
      }
    });
  },

  dbclose: function (con) {
    con.dbclose(function (err) {
      if (err) {
        console.error("mysql close error : " + err);
      } else {
        console.info("mysql close successfully.");
      }
    });
  },
};

module.exports = dbconnection;
