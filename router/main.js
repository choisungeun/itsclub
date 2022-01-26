const mysql = require("mysql");
const bcrypt = require("bcryptjs");

module.exports = function (app, bodyParser) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", function (req, res) {
    console.log("root");
    res.render("index");
  });

  app.get("/homes/bicycle.html", function (req, res) {
    console.log("bicycle");
    res.render("homes/bicycle");
  });

  app.get("/pages/signin.html", function (req, res) {
    console.log("signin");
    let id = "a@a.com";
    let locals = {
      id: id,
    };
    res.render("pages/signin", locals);
  });

  app.post("/pages/login_check", function (req, res, next) {
    console.log("login_check");
    var login_id = req.body.id;
    var login_pwd = req.body.pwd;
    var crypt_login_pwd = bcrypt.hashSync(login_pwd);
    var result = saveUser(login_id, crypt_login_pwd);
    res.redirect("/");
  });
};

function savrUser(login_id, login_pwd) {
  const conn = {
    host: "localhost",
    port: "3307",
    user: "root",
    password: "aaaaaaa",
    database: "testdb",
  };

  var connection = mysql.createConnection(conn);
  connection.connect();
  var testQuery = "insert.....";
  connection.query(testQuery, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });

  testQuery = "select * from dual";

  connection.query(testQuery, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });

  connectin.end();

  return true;
}
