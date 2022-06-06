var express = require("express");
var router = express.Router();

var dbConObj = require("../conf/db_info");
var dbconn = dbConObj.init();

var joinUs = require("./joinus"); //클럽목록
var calendar = require("./calendarEvent"); //달력 이벤트 불러오기

//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/index.html", function (req, res, next) {
  res.render("index");
});

router.get("/joinus.html", function (req, res, next) {
  joinUs.get(req, res, next, dbconn);
});

router.post("/joinus.html", function (req, res, next) {
  joinUs.join(req, res, next, dbconn);
});

router.get("/logout", function (req, res, next) {
  req.logOut();
  res.redirect("index.html");
});

router.post("/calendar", function (req, res, next) {
  calendar.get(req, res, next, dbconn);
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
