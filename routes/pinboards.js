var express = require('express');
var router = express.Router();
var Pinboard = require('../models/pinboard');

router.get('/pinboard', function(req, res){
  res.render('pinboard');
});


router.post('/pinboard', function(req, res){
  var pinboardName = req.body.pinboardName;
  console.log('here');
  var newPinboard = new Pinboard({
    name: pinboardName
  });

  Pinboard.createPinboard(newPinboard,function(err, pinboard){
    if(err) throw err;
    console.log(pinboard);
  });
  req.flash('success_msg', 'Pinboard created');
  res.redirect('/users/login');
});

module.exports = router;
