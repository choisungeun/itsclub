const fs = require("fs"); // 1
var dir = "./uploadedFiles";
if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2

var addEvent = {
  addEvent: function (req, res, next, dbconn) {
    console.log("AddEvent");

    const timestamp = +new Date();
    const attachmentFileArray = [];

    for (idx in req.files) {
      // const attachmentFile = {
      //   ...req.files[idx],
      //   id: timestamp,
      // };
      attachmentFileArray.push([
        timestamp,
        req.files[idx].fieldname,
        req.files[idx].originalname,
        req.files[idx].encoding,
        req.files[idx].mimetype,
        // req.files[idx].destination,
        "uploadedFiles/",
        req.files[idx].filename,
        req.files[idx].path,
        req.files[idx].size,
      ]);
    }

    var sql =
      "INSERT INTO calendar_event (id, start_date, end_date, title, color, content)" +
      " VALUES ('" +
      timestamp +
      "','" +
      req.body.StartEventDate +
      "','" +
      req.body.EndEventDate +
      "','" +
      req.body.EventTitle +
      "','" +
      req.body.EventColor +
      "','" +
      req.body.EventContent +
      "')";

    var attachmentsql = "INSERT INTO calendar_attachments (id, fieldname, originalname, encoding, mimetype, destination, filename, path, size) VALUES ?";
    dbconn.query(sql, function (err, results, fields) {
      if (err) {
        res.status(500).json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        if (attachmentFileArray.length > 0) {
          dbconn.query(attachmentsql, [attachmentFileArray], function (err, results, fields) {
            if (err) {
              res.status(500).json({ status_code: 500, status_message: "file db insert error" });
            } else {
              // Render index.pug page using array
              res.redirect("clubevent.html");
            }
          });
        } else {
          res.redirect("clubevent.html");
        }
      }
    });
  },
};

module.exports = addEvent;
