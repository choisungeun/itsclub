var deleteEvent = {
  deleteEvent: function (req, res, next, dbconn) {
    console.log("deleteEvent");

    var sql = "DELETE FROM calendar_event WHERE id = '" + req.body.id + "'";
    var attachmentDeletsql = "DELETE FROM calendar_attachments WHERE id = '" + req.body.id + "'";

    dbconn.query(sql, function (err, results, fields) {
      if (err) {
        res.status(500).json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        dbconn.query(attachmentDeletsql, function (err, results, fields) {
          if (err) {
            res.status(500).json({ status_code: 500, status_message: "file db insert error" });
          } else {
            // Render index.pug page using array
            res.redirect("clubevent.html");
          }
        });
      }
    });
  },
};

module.exports = deleteEvent;
