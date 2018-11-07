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

  describe('/GET/:id/parcels', () => {
    it('it should GET parcel delivery order with specific ID', (done) => {
      let userId = 2;
      const url = `/api/v1/users/:${userId}`
      request
        .get(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });

});

