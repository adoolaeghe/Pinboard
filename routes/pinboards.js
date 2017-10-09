var express = require('express');
var router = express.Router();
var Pinboard = require('../models/pinboard');

router.get('/pinboard', function(req, res){
  res.render('pinboard');
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
