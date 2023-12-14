const changeLocale = (req, res) => {
  console.log(req.params);
  res.json(req.params);
};

module.exports = changeLocale;
