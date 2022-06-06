var express = require("express");
var router = express.Router();
var multer = require("multer"); // 1

var dbConObj = require("../conf/db_info");
var dbconn = dbConObj.init();

var storage = multer.diskStorage({
  // 2
  destination(req, file, cb) {
    cb(null, "public/uploadedFiles/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var upload = multer({ dest: "public/uploadedFiles/" }); // 3-1
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

/**
 * 실제 업무처리 로직이 명시된 router import
 */
var clubList = require("./homes/clubList"); //클럽목록
var clubEvent = require("./homes/clubEvent"); //클럽행사
var addEvent = require("./homes/addEvent"); //달력 이벤트 저장하기
var editEvent = require("./homes/editEvent"); //달력 이벤트 수정하기
var deleteEvent = require("./homes/deleteEvent"); //달력 이벤트 수정하기
var eventDetail = require("./homes/eventDetail"); //달력 이벤트 세부

router.get("/clublist.html", function (req, res, next) {
  clubList.list(req, res, next, dbconn);
});

router.get("/clubevent.html", function (req, res, next) {
  clubEvent.event(req, res, next, dbconn);
});

router.post("/addEvent", upload.array("attachments"), function (req, res, next) {
  addEvent.addEvent(req, res, next, dbconn);
});

router.post("/editEvent", upload.array("attachments"), function (req, res, next) {
  editEvent.editEvent(req, res, next, dbconn);
});

router.post("/deleteEvent", function (req, res, next) {
  deleteEvent.deleteEvent(req, res, next, dbconn);
});

router.get("/eventDetail", function (req, res, next) {
  eventDetail.eventDetail(req, res, next, dbconn);
});

module.exports = router;
