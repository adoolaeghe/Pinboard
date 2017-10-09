var mongoose = require('mongoose');

var PinboardSchema = mongoose.Schema({

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