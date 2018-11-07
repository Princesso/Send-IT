import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

let should = chai.should();
chai.use(chaiHttp)
const request = chai.request(app)



describe('Parcel delivery orders', () => {
  beforeEach((done) => {
    done();
  });

  //after(() => request.server.close());

  describe('/GET users', () => {
    it('it should GET all users', (done) => {
      request
        .get('/api/v1/users')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.should.be.json;
          done();
        });
    });
  });

});

