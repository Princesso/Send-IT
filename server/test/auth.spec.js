import Auth from '../controllers/UsersController'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

let should = chai.should();
chai.use(chaiHttp)
const request = chai.request(app)

describe ('Authentication Tests', () => {
  afterEach((done) => {
    done();
    console.log("In test")
  });
  describe('/POST login to the application', () => {
    it('return a token and a message', (done) => {
      let loginData = {
       email: "egbunaoluebube@gmail.com",
       password: "princess"
      };
      chai.request(app)
          .post('/api/v1/auth/login')
          .send(loginData)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/POST signup already existing user', () => {
    it('should not be successful', (done) => {
      let loginData = {
        firstname: "Udum",
        lastname: "Ngozi",
        email: "udumNgozi@gmail.com",
        username: "udungozi.123",
        password: "princess"
      };
      chai.request(app)
          .post('/api/v1/auth/signup')
          .send(loginData)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
})
describe('something', () => {
  true.should.be.true
})