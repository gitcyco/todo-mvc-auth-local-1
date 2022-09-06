module.exports = {
  getIndex: (req, res) => {
    if (req.user) {
      return res.redirect("/tickets");
    }
    res.render("index.ejs");
  },
};
