const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
var dbConObj = require("../conf/db_info"); //사용자 정의한 함수 사용
var dbconn = dbConObj.init();

exports.config = (passport) => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log("deserializeUser");
    return done(null, user);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      (id, password, done) => {
        var sql = "select id, passwd, admin from club where id = ?"; // 유저검색
        dbConObj.dbopen(dbconn);
        dbconn.query(sql, id, function (err, results, fields) {
          if (err) {
            console.error(err);
            return done(err); // 서버 에러가 있는 경우 done 첫 번째 인자로 error 정보 넘김
          } else {
            // Render index.pug page using array
            if (results.length < 1) {
              return done(null, false, {
                reason: "존재하지 않는 사용자입니다.",
              });
            }
            const user = results[0];
            if (bcrypt.compareSync(password, user.passwd)) {
              return done(null, user);
            } else {
              return done(null, false, { reason: "비밀번호가 틀립니다." }); // 비밀번호 틀렸을 때
            }
          }
        });
      }
    )
  );
};
