var mongoose = require('mongoose');

var PinboardSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'UserSchema'
  },

  bookmarklets: [
    {type: String,
    index: true}
    ]
});

var User = module.exports = mongoose.model('Pinboard', PinboardSchema);

module.exports.createPinboard = function (newPinboard, callback){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
  });
};
