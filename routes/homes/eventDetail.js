var eventDetail = {
  eventDetail: function (req, res, next, dbconn) {
    console.log(req.query.id);
    const eventId = req.query.id;
    var sql =
      "select " +
      " id" +
      ", DATE_FORMAT(start_date, '%Y-%m-%d') as start " +
      ", DATE_FORMAT(end_date, '%Y-%m-%d') as end" +
      ", title" +
      ", color" +
      ", content" +
      " from calendar_event" +
      " where id = ?";
    var attachmentSql = "select * from calendar_attachments" + " where id = ?";
    let eventContent;
    let attachmentList;

    dbconn.query(sql, [eventId], function (err, results, fields) {
      if (err) {
        res.status(500).json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        eventContent = JSON.parse(JSON.stringify(results))[0];
        console.log(eventContent);

        dbconn.query(attachmentSql, [eventId], function (err, resultss, fields) {
          if (err) {
            res.status(500).json({ status_code: 500, status_message: "internal server error" });
          } else {
            // Render index.pug page using array
            attachmentList = JSON.parse(JSON.stringify(resultss));
            console.log(attachmentList);
            res.render("homes/eventDetail", {
              eventContents: eventContent,
              attachmentList: attachmentList,
            });
          }
        });
      }
    });
  },
};

const getList = (sql, queryParams, dbconn) => {
  return new Promise(function (resolve, reject) {
    dbconn.query(sql, [queryParams], function (err, result, fields) {
      if (!err) resolve(JSON.parse(JSON.stringify(result))); // Hacky solution
      else reject(err);
    });
  });
};

module.exports = eventDetail;
