import Auth from '../controllers/UsersController'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import assert from 'assert'

let should = chai.should();
chai.use(chaiHttp)
const request = chai.request(app)

describe ('User Endpoint Tests', () => {
  afterEach((done) => {
    done();
  });
  describe('/GET ALL USERS', () => {
    it('should not return all users in the application if token is not provided ', (done) => {
      chai.request(app)
          .get('/api/v1/users')
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/GET specific user', () => {
    it('should not return 200 if token is not provided', (done) => {
      chai.request(app)
          .get('/api/v1/users/1')
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/GET specific user parcels', () => {
    it('should not return a specific user parcel if token is not defined', (done) => {
      chai.request(app)
          .get('/api/v1/users/1/parcels')
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
})