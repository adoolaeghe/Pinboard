var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var PinboardSchema = mongoose.Schema({

  userID: {
    type: String,
    reference: 'UserSchema'
  },

  name: {
    type: String,
    index: true
  },

  bookmarklets: [
    {type: String,
    index: true}
    ]
});

var Pinboard = module.exports = mongoose.model('Pinboard', PinboardSchema);

module.exports.createPinboard = function (newPinboard, callback){
  newPinboard.save(callback);
};
