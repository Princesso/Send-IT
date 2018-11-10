import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

let should = chai.should();
chai.use(chaiHttp)

// after(() => {
//   request.server.close();
// })


describe('Parcel delivery orders', () => {
  afterEach((done) => {
    done();
  });


  describe('/GET users', () => {
    const request = chai.request(app)

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
    const request = chai.request(app)

    it('it should GET parcel delivery order with specific ID', (done) => {
      let userId = 2;
      const url = `/api/v1/users/${userId}`
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

