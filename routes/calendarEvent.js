var dbConObj = require("../conf/db_info");
var dbconn = dbConObj.init();
const bcrypt = require("bcryptjs");

var calendarEvent = {
  get: function (req, res, next) {
    console.log("Get calendarEvent");
    var sql = "select * from bank_list"; // 은행목록
    dbConObj.dbopen(dbconn);
    dbconn.query(sql, function (err, results, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        res.send([
          {
            title: "Long Event",
            start: "2022-01-26",
            end: "2022-02-16",
          },
        ]);
      }
    });
  },
};

module.exports = calendarEvent;
