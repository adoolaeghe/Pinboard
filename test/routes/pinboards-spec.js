var Pinboard = require('../../models/pinboard.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require('../../app');
var should = require('should');

chai.use(chaiHttp);

var userRegistration = {
  name: 'sponge',
  username: 'spongebob',
  email: 'sponge@bob.com',
  password: 'garyTheSnail',
  confirmpassword:'garyTheSnail'
};
var userLogin = {
  username: 'spongebob',
  password: 'garyTheSnail',
};

describe('Pinboard', function() {
  before(function(done){
  chai.request(app)
    .post('/users/register')
    .send(userRegistration)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      expect('Location', '/pinboard');
      done();
    });
  });
  describe('/GET', function() {
    it('it should render the pinboard page', function(done) {
      chai.request(app)
      .get('/pinboards')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.type).to.equal('text/html');
        done();
      });
    });
  });
  describe('/GET new', function() {
    it('it should render the page to add a pinboard', function(done) {
      chai.request(app)
      .get('/pinboards/new')
      .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          done();
        }
      );
    });
  });
  describe('/GET bookmarklets', function() {
    it('it display the bookmarklets for a specific pinboard', function(done) {
      chai.request(app)
      .get('/pinboards/bookmarklets')
      .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          done();
        }
      );
    });
  });
  // describe('/POST pinboard', function(){
  //   it('it post a new pinboard', function(done) {
  //     var pinboard = new Pinboard({userID: 'userId',name: 'name',bookmarklets: ['bookmarklets']});
  //     pinboard.save((function(err, res) {
  //       chai.request(app)
  //       .post('/pinboards/pinboard')
  //       .send(pinboard)
  //       .end(function(err, res) {
  //         expect(res).to.have.status(200);
  //         expect(res.type).to.equal('text/html');
  //         done();
  //       });
  //     }));
  //   });
  // });
});
