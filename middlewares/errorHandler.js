module.exports = function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
};
