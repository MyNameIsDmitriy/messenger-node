module.exports = function (req, res) {
  res.status(404).sendFile(process.cwd() + "/src/404.json");
};
