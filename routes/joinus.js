var dbConObj = require("../conf/db_info"); //사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var joinUs = {
  //클럽목록
  get: function (req, res, next) {
    console.log("Get joinUs");
    res.render("joinus");
  },
  join: function (req, res, next) {
    console.log("joinUs");
    // console.log(req.body);

    const jsonObj = req.body;
    console.log(jsonObj);
    const responseJson = JSON.stringify(req.body);
    // console.log(responseJson);

    var post = Object.keys(jsonObj).map(function (index) {
      var obj = jsonObj[index];
      return Object.keys(obj).map(function (val) {
        return obj[val];
      });
    });

    // var sql = "INSERT INTO club VALUES (?)";
    var sql =
      "INSERT INTO club (id,koreanName,englishName,gender,personalNumber,mobile,phoneNumber,emailAddress,postNumber,detailAddress,membertype,bank,bankAccout,payday,inviterName,passwd)" +
      " VALUES ('" +
      req.body.id +
      "','" +
      req.body.koreanName +
      "','" +
      req.body.englishName +
      "','" +
      req.body.gender +
      "','" +
      req.body.personalNumber +
      "','" +
      req.body.mobile +
      "','" +
      req.body.phoneNumber +
      "','" +
      req.body.emailAddress +
      "','" +
      req.body.postNumber +
      "','" +
      req.body.detailAddress +
      "','" +
      req.body.membertype +
      "','" +
      req.body.bank +
      "','" +
      req.body.bankAccout +
      "','" +
      req.body.payday +
      "','" +
      req.body.inviterName +
      "','" +
      req.body.passwd +
      "')"; // 클럽목록

    dbConObj.dbopen(dbconn);
    dbconn.query(sql, function (err, results, fields) {
      console.log(results);
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        res.render("joinus");
      }
    });
  },
};

module.exports = joinUs;
