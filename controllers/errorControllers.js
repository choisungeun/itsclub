const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("pages/404");
};

exports.respondInternalError = (errors, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`Error occured: ${errors.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
