var clubList = {
  //클럽목록
  list: function (req, res, next, dbconn) {
    var sql = "select * from club"; // 클럽목록
    dbconn.query(sql, function (err, results, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        res.render("homes/clublist", {
          data: "Club Member List",
          personList: results,
        });
      }
    });
  },
};

module.exports = clubList;
