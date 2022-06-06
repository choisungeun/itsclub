const bcrypt = require("bcryptjs");

var calendarEvent = {
  get: function (req, res, next, dbconn) {
    console.log("Get calendarEvent");
    var sql =
      "select " +
      " id" +
      ", DATE_FORMAT(start_date, '%Y-%m-%dT%H:%i:%s' ) as start " +
      ", DATE_FORMAT(DATE_ADD(end_date, INTERVAL 1 DAY), '%Y-%m-%dT%H:%i:%s') as end" +
      ", title" +
      ", color" +
      ", 'true' as allDay" +
      ", concat('eventDetail', '?', 'id=', id) as url" +
      " from calendar_event"; // 이벤트 목록
    // var sql = "select id, start_date as start, DATE_ADD(end_date, INTERVAL 1 MINUTE) as end, title, color, 'true' as allDay from calendar_event"; // 이벤트 목록
    dbconn.query(sql, function (err, results, fields) {
      console.log(results);
      var resultArray = null;
      if (results.length > 0) {
        resultArray = Object.values(JSON.parse(JSON.stringify(results)));
      }
      console.log(resultArray);
      if (err) {
        res.status(500).json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        res.send(resultArray);
      }
    });
  },
};

module.exports = calendarEvent;
