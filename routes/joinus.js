const bcrypt = require("bcryptjs");

var joinUs = {
  //클럽목록
  get: function (req, res, next, dbconn) {
    console.log("Get joinUs");
    var sql = "select * from bank_list"; // 은행목록
    dbconn.query(sql, function (err, results, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        res.render("joinus", {
          bankList: results,
        });
      }
    });
  },
  join: function (req, res, next, dbconn) {
    console.log("joinUs");

    var crypt_passwd = bcrypt.hashSync(req.body.passwd);

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
      crypt_passwd +
      "')"; // 클럽목록

    dbconn.query(sql, function (err, results, fields) {
      console.log(results);
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        // Render index.pug page using array
        res.redirect("joinus.html");
      }
    });
  },
};

module.exports = joinUs;
