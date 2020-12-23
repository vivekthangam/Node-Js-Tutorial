//@desc    logs request to console
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}//${req.get("host")}${req.originalUrl}`
  );
  req.hello = "Hello there!!!!";
  next();
};

module.exports = logger;
