var dbConObj = require("../../conf/db_info"); //사용자 정의한 함수 사용
var dbconn = dbConObj.init();
const bcrypt = require("bcryptjs");

var signIn = {
  //클럽목록
  get: function (req, res, next) {
    res.render("pages/signin");
  },
  loginCheck: function (req, res, next) {
    var id = req.body.id;
    var pwd = req.body.password;
    var sql = "select passwd from club where id = ?"; // 클럽목록
    dbConObj.dbopen(dbconn);
    dbconn.query(sql, id, function (err, results, fields) {
      if (err) {
        res.status(500).json({
          status_code: 500,
          status_message: "internal server error",
        });
      } else {
        // Render index.pug page using array
        if (results.length > 0 && bcrypt.compareSync(pwd, results[0].passwd)) {
          res.redirect("/index.html");
        } else {
          res.render("pages/signin");
        }
      }
    });
  },
};

module.exports = signIn;
