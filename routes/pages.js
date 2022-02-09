var express = require("express");
var router = express.Router();

/**
 * 실제 업무처리 로직이 명시된 router import
 */
var signIn = require("./pages/signin"); //로그인

router.get("/singin.html", function (req, res, next) {
  signIn.get(req, res, next);
});

router.post("/singin.html", function (req, res, next) {
  signIn.loginCheck(req, res, next);
});

module.exports = router;
