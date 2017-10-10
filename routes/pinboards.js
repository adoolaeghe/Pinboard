var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var Pinboard = require('../models/pinboard');
var assert = require('assert');

var url = 'mongodb://localhost:27017/pinboard';

router.get('/', ensureAuthenticated, function(req, res){
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var pinboard = db.collection('pinboards').find();
    pinboard.forEach(function(doc, err) {
      if(doc.userID == req.user._id){
        assert.equal(null, err);
        resultArray.push(doc);
      }
    }, function(){
      db.close();
      res.render('pinboards', { username: req.user.username, items: resultArray });
    });
  });
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/');
  }
}

router.get('/new', function(req, res){
  res.render('newPinboard');
});

router.post('/pinboard', function(req, res){
  var pinboardName = req.body.pinboardName;
  var bookmarklets = req.body.bookmarklets;
  var userId = req.user._id;
  console.log(userId);
  var newPinboard = new Pinboard({
    userID: userId,
    name: pinboardName,
    bookmarklets: bookmarklets
  });

  Pinboard.createPinboard(newPinboard,function(err, pinboard){
    if(err) throw err;
    console.log(pinboard);
  });

  req.flash('success_msg', 'Pinboard created');
  res.redirect('/pinboards');
});

module.exports = router;
