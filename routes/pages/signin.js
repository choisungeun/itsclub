const passport = require("passport");

var signIn = {
  //클럽목록
  get: function (req, res, next) {
    console.log("get Signin");
    if (req.isAuthenticated() && req.user) {
      res.redirect("/index.html");
    } else {
      res.render("pages/signin");
    }
  },

  loginCheck: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    }

    passport.authenticate("local", function (authError, user, info) {
      if (authError) {
        console.error(authError);
        next(authError);
      }
      if (!user) {
        res.render("pages/signin", {
          loginError: info,
        });
      } else {
        req.login(user, function (loginError) {
          if (loginError) {
            res.render("pages/signin", {
              loginError: loginError,
            });
          }
          res.redirect("/index.html");
        });
      }
    })(req, res, next);
  },
};

module.exports = signIn;
