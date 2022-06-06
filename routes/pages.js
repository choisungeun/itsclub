var express = require("express");
var router = express.Router();
const passport = require("passport");
/**
 * 실제 업무처리 로직이 명시된 router import
 */
var signIn = require("./pages/signin"); //로그인

router.get("/signin.html", function (req, res, next) {
  signIn.get(req, res, next);
});

router.post("/signin.html", (req, res, next) => {
  signIn.loginCheck(req, res, next);
});

// router.post(
//   "/singin.html",
//   passport.authenticate("local", (authError, user, info) => {
//     console.log("test2");
//   }),
//   (req, res, nex) => {
//     console.log("test1");
//   }
// );

module.exports = router;
