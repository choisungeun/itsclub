//필요한 모듈 선언
const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookiePaser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const generalConfObj = require("./conf/general_conf");
const passportConfig = require("./passport").config(passport);
const errorController = require("./controllers/errorControllers");

require("dotenv").config();

//라우팅 모듈 선언
const indexRouter = require("./routes/index");
const homesRouter = require("./routes/homes");
const pagesRouter = require("./routes/pages");

//express 서버 포트 설정(cafe24 호스팅 서버는 8001 포트 사용)
app.use(logger("dev"));
app.set("views", `${__dirname}/src/pug`);
app.set("view engine", "pug");
app.use("/", express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiePaser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.isLogin = false;
  res.locals.isAdmin = false;
  if (req.isAuthenticated() && req.user) {
    res.locals.isLogin = true;
    if (req.user.admin === "Y") {
      res.locals.isAdmin = true;
    }
  }
  next();
});

//서버 생성
// http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express server listening on port ' + app.get('port'));
// });
app.listen(8000, () => {
  console.log("express Listen port 8000");
});

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use("/", indexRouter);
app.use("/homes", homesRouter); //클럽
app.use("/pages", pagesRouter); //클럽

app.use(errorController.pageNotFoundError);
app.use(errorController.respondInternalError);
