var dbConObj = require("../../conf/db_info"); //사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var clubList = {
  //클럽목록
  list: function (req, res, next) {
    var personList = [];
    var sql = "select * from club"; // 클럽목록
    dbConObj.dbopen(dbconn);
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
