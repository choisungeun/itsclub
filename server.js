//필요한 모듈 선언
var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");

//express 서버 포트 설정(cafe24 호스팅 서버는 8001 포트 사용)
// app.use(logger("dev"));
app.set("views", `${__dirname}/src/pug`);
app.set("view engine", "pug");
app.use("/", express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

//서버 생성
// http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express server listening on port ' + app.get('port'));
// });
app.listen(8000, () => {
  console.log("express Listen port 8000");
});

//라우팅 모듈 선언
var indexRouter = require("./routes/index");
var homesRouter = require("./routes/homes");

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use("/", indexRouter);
app.use("/homes", homesRouter); //클럽
