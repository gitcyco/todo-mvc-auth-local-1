module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      if (req.method === "GET") {
        res.redirect("/");
      } else {
        res.json("UNAUTHORIZED");
      }
    }
  },
  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    } else {
      if (req.method === "GET") {
        res.redirect("/");
      } else {
        res.json("UNAUTHORIZED");
      }
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
