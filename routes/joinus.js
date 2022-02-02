var dbConObj = require("../conf/db_info"); //사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var joinUs = {
  //클럽목록
  get: function (req, res, next) {
    console.log("Get joinUs");
    res.render("joinus");
  },
  join: function (req, res, next) {
    console.log("joinUs");
    res.render("joinus");
  },
};

module.exports = joinUs;
