var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var Pinboard = require('../models/pinboard');
var assert = require('assert');

var url = 'mongodb://localhost:27017/pinboard';

router.get('/', ensureAuthenticated, function(req, res){
  var resultArray = [];
  var userId = req.user._id;
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var pinboard = db.collection('pinboards').find();
    pinboard.forEach(function(doc, err) {
      if(doc.userID == userId){
        assert.equal(null, err);
        resultArray.push(doc);
      }
    }, function(){
      db.close();
      res.render('pinboards', { username: req.user.username, items: resultArray });
    });
  });
});

router.get('/new', function(req, res){
  res.render('newPinboard');
});

router.get('/bookmarklets', function(req,res){
  var resultArray = [];
  var id = req.query['id'];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var pinboard = db.collection('pinboards').find();
    pinboard.forEach(function(doc, err) {
      if(doc._id == id){
        assert.equal(null, err);
        resultArray.push(doc);
      }
    }, function(){
      db.close();
      res.render('bookmarklet', {query: id, items: resultArray });
    });
  });
});

router.post('/bookmarklets', function(req,res){
  res.redirect('/pinboards/bookmarklets?id='+ req.body.bookmarkId);
});

router.post('/bookmarklets/new', function(req,res){
  var bookmarklet = req.body.bookmarklets;

  mongo.connect(url, function(err, db) {
    db.collection('pinboards').find({}).forEach(function(doc){
      if(doc._id == req.body.bookmarkId && bookmarklet != ""){
        doc.bookmarklets.push(bookmarklet);
        db.collection('pinboards').save(doc);
      }
    });
  });
  res.redirect('/pinboards/bookmarklets?id='+ req.body.bookmarkId);
});

router.post('/pinboard', function(req, res){
  var pinboardName = req.body.pinboardName;
  var bookmarklets = req.body.bookmarklets;
  var userId = req.user._id;
  var newPinboard = new Pinboard({
    userID: userId,
    name: pinboardName,
    bookmarklets: bookmarklets
  });

  Pinboard.createPinboard(newPinboard,function(err, pinboard){
    if(err) throw err;
  });

  req.flash('success_msg', 'Pinboard created');
  res.redirect('/pinboards');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/');
  }
}
module.exports = router;
