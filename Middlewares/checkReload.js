const checkReload = (req, res, next) => {
  if (req.headers.referer && req.headers.referer.includes(req.hostname)) {
    return res.redirect("/login");
  }
  next();
};

module.exports = {
  checkReload,
};
