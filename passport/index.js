const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
var dbConObj = require("../conf/db_info"); //사용자 정의한 함수 사용
var dbconn = dbConObj.init();

exports.config = (passport) => {
  passport.serializeUser((user, done) => {
    console.log("sss");
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log("sss1");
    return done(null, user);
  });
  passport.use(
    new LocalStrategy(
      { usernameField: "id", passwordField: "password" },
      (id, password, done) => {
        console.log("sss2");
        var sql = "select passwd from club where id = ?"; // 유저검색
        dbConObj.dbopen(dbconn);
        dbconn.query(sql, id, function (err, results, fields) {
          if (err) {
            console.error(err);
            return done(err); // 서버 에러가 있는 경우 done 첫 번째 인자로 error 정보 넘김
          } else {
            // Render index.pug page using array
            if (results.length < 1) {
              console.log("존재하지 않는 사용자 입니다.");
              return done(null, false, {
                reason: "존재하지 않는 사용자입니다.",
              });
            }
            if (bcrypt.compareSync(password, results[0].passwd)) {
              console.log("오케이");
              const user = results;
              return done(null, user);
            } else {
              console.log("패스워드 틀림");
              const user = results;
              return done(null, false, { reason: "비밀번호가 틀립니다." }); // 비밀번호 틀렸을 때
            }
          }
        });
        // try {
        //   const user = await db.User.findOne({ where: { userId } });
        //   if (!user) {
        //     // 유저가 있는지 확인 후 유저가 없다면
        //     return done(null, false, { reason: "존재하지 않는 사용자입니다." });
        //   }
        //   const result = await bcrypt.compare(password, user.password);
        //   if (result) {
        //     // 유저가 있다면 비밀번호 확인 후 done 두 번째 인자로 유저 정보 넘김
        //     return done(null, user);
        //   }
        //   return done(null, false, { reason: "비밀번호가 틀립니다." }); // 비밀번호 틀렸을 때
        // } catch (e) {
        //   console.error(e);
        //   return done(e); // 서버 에러가 있는 경우 done 첫 번째 인자로 error 정보 넘김
        // }
      }
    )
  );
};
