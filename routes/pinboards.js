var express = require('express');
var router = express.Router();
var Pinboard = require('../models/pinboard');

router.get('/', ensureAuthenticated, function(req, res){
  res.render('pinboards');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
}

router.get('/new', function(req, res){
  res.render('newPinboard');
});

router.post('/pinboard', function(req, res){
  var pinboardName = req.body.pinboardName;
  var bookmarklets = req.body.bookmarklets;
  var userId = req.body.user_id;
  console.log(req.user._id);
  var newPinboard = new Pinboard({
    user: userId,
    name: pinboardName,
    bookmarklets: bookmarklets
  });

  Pinboard.createPinboard(newPinboard,function(err, pinboard){
      if(err) throw err;
      console.log(pinboard);
  });

  req.flash('success_msg', 'Pinboard created');
  res.redirect('/pinboard/login');
});

module.exports = router;
