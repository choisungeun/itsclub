var express = require("express");
var router = express.Router();

/**
 * 실제 업무처리 로직이 명시된 router import
 */
var clubList = require("./homes/clubList"); //클럽목록
var clubEvent = require("./homes/clubEvent"); //클럽행사

router.get("/clublist.html", function (req, res, next) {
  clubList.list(req, res, next);
});

router.get("/clubevent.html", function (req, res, next) {
  clubEvent.event(req, res, next);
});

module.exports = router;
