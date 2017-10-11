var User = require('../../models/user.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require('../../app');
var should = require('should');

chai.use(chaiHttp);

describe('Users', function() {
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
  describe('/GET logout', function() {
    it('it should render a when log', function(done) {
      chai.request(app)
      .get('/users/logout')
      .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          done();
        }
      );
    });
  });
  describe('/POST login', function(){
    it('it should login', function(done) {
      var user = new User({username: 'username', password: 'password', email: 'email',name: 'name'});
      user.save((function(err, res) {
        chai.request(app)
        .post('/users/login')
        .send(user)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('text/html');
          expect('Location', '/pinboards');
          done();
        });
      }));
    });
  });
});
