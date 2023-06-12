function authenticate(req, res, next) {
  if (!req.session.user || !req.session.user.id) {
    return res.redirect('/login'); 
  }
  next();
}

module.exports = {
  authenticate
};
