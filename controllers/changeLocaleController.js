const changeLocale = (req, res) => {
  const { locale } = req.params;
  console.log(locale);
  res.cookie("nodepop-locale", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // un mes - 30 días
  });
  res.redirect(req.get("referer"));
};

module.exports = changeLocale;
