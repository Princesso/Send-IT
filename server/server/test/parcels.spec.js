import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

let should = chai.should()
chai.use(chaiHttp)

describe('Parcel delivery orders', () => {
  beforeEach((done) => {
    done();
  });

  describe('/GET parcel delivery orders', () => {
    it('it should GET all parcel delivery orders', (done) => {
      chai.request(app)
          .get('/api/v1/parcels')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.should.be.json;
            done();
          });
    });
  });

});

