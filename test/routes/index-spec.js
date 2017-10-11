var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require('../../app');
var should = require('should');

chai.use(chaiHttp);

describe('Index', function() {
  describe('/GET', function() {
    it('it should render the index page', function(done) {
      chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.type).to.equal('text/html');
        done();
      });
    });
  });
});
