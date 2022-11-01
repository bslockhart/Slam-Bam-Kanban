const router = require('express').Router();
const { PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Pages with data
router.get('/', isAuthenticated, PageController.getDashboard);

module.exports = router;