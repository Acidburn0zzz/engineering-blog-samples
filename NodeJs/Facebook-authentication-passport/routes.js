var passport = require('passport');
const express = require('express');

var router = express.Router();


router.get('/', function (req, res) {
  res.render('pages/index.ejs'); // load the index.ejs file
});
router.get('/profile', isLoggedIn, function (req, res) {
 console.log("req ", req.user);
  res.render('pages/profile.ejs', {
    user: req.user // get the user out of session and pass to template
  });
});


router.get('/error', isLoggedIn, function (req, res) {
  res.render('pages/error.ejs');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email', 'picture', 'first_name', 'last_name', 'user_birthday']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/error'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;