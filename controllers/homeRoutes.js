const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");




router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("login");
});


router.get('/search', async (req, res) =>
  res.render('job_search', {
    logged_in: req.session.logged_in,
  }
  )
)

router.get('/home', async (req, res) =>
  res.render('homepage', {
    logged_in: req.session.logged_in,
  }
  )
)

router.get("*", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
});

module.exports = router