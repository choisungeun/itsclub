const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./router/main")(app, bodyParser);

app.set("views", `${__dirname}/src/pug`);
app.set("view engine", "pug");
app.use("/", express.static(`${__dirname}/public`));

app.listen(8000, () => {
  console.log("express Listen port 8000");
});
