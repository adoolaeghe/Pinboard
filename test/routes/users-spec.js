var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost/pinboard';
var mongoose = require('mongoose');
var db    = mongoose.connect(dbUri);
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require('../../app');
var should = require('should');

chai.use(chaiHttp);

describe('Palindromes', function() {

  after( function(done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('/GET login', function() {
    it('it should render the login page', function(done) {
      chai.request(app)
      .get('/users/login')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.type).to.equal('text/html');
        done();
      });
    });
  });
  describe('/GET register', function() {
    it('it should render the register page', function(done) {
      chai.request(app)
      .get('/users/register')
      .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          done();
        }
      );
    });
  });
});
