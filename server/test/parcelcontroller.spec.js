import Parcel from '../controllers/ParcelsController'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

let should = chai.should();
chai.use(chaiHttp)
const request = chai.request(app)

describe ('Parcel delivery order operations test', () => {
  afterEach((done) => {
    done();
  });
  describe('/POST create a new parcel delivery order', () => {
    it('should not be successful if there is no header token provided', (done) => {
      let newParcel = {
        weight: 5,
        fromAddress: "Testgood",
        toAddress: "Obanikoro"
      };
      chai.request(app)
          .post('/api/v1/parcels')
          .send(newParcel)
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/GET parcel delivery orders', () => {
    it('should not return a list of parcel delivery orders without a token', (done) => {
      chai.request(app)
          .get('/api/v1/parcels')
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/GET a specific parcel delivery order the application', () => {
    it('should not get one parcel delivery order without a token', (done) => {
      chai.request(app)
          .get('/api/v1/parcels/1')
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/PATCH cancel specific parcel delivery order', () => {
    it('should not cancel a parcel delivery order without a token', (done) => {
      chai.request(app)
          .patch('/api/v1/parcels/:id/cancel')
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/PATCH change destination of specific parcel delivery order the application', () => {
    it('should not change destination of a parcel delivery order without a token', (done) => {
      const patchData = "Ojo"
      chai.request(app)
          .patch('/api/v1/parcels/1/destination')
          .send(patchData)
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/PATCH change current location of specific parcel delivery order the application', () => {
    it('should not change current location of a parcel delivery order without a token', (done) => {
      const patchData = "Alaba"
      chai.request(app)
          .patch('/api/v1/parcels/1/currentlocation')
          .send(patchData)
          .end((err, res) => {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            done();
          });
    });
  });
  describe('/PATCH change status of specific parcel delivery order the application', () => {
    it('change status of a parcel delivery order without a token', (done) => {
      const status = "delivered"
      chai.request(app)
          .patch('/api/v1/parcels/1/status')
          .send(status)
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