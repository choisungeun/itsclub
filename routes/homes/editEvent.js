const fs = require("fs"); // 1
var dir = "./uploadedFiles";
if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2

var editEvent = {
  editEvent: function (req, res, next, dbconn) {
    console.log("editEvent");

    const attachmentFileArray = [];

    for (idx in req.files) {
      // const attachmentFile = {
      //   ...req.files[idx],
      //   id: timestamp,
      // };
      attachmentFileArray.push([
        req.body.id,
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
      "UPDATE calendar_event SET start_date = '" +
      req.body.StartEventDate +
      "', end_date = '" +
      req.body.EndEventDate +
      "', title = '" +
      req.body.EventTitle +
      "', color = '" +
      req.body.EventColor +
      "', content = '" +
      req.body.EventContent +
      "' where id = '" +
      req.body.id +
      "'";

    var attachmentDeletsql = "DELETE FROM calendar_attachments WHERE id = '" + req.body.id + "'";
    var attachmentsql = "INSERT INTO calendar_attachments (id, fieldname, originalname, encoding, mimetype, destination, filename, path, size) VALUES ?";
    dbconn.query(sql, function (err, results, fields) {
      if (err) {
        res.status(500).json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        if (attachmentFileArray.length > 0) {
          dbconn.query(attachmentDeletsql, function (err, results, fields) {
            if (err) {
              res.status(500).json({ status_code: 500, status_message: "file db insert error" });
            }
          });

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

module.exports = editEvent;
