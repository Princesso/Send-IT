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

  describe('/GET parcel delivery orders', () => {
    it('it should GET all parcel delivery orders', (done) => {
      request
        .get('/api/v1/parcels')
        .end((err, res) => {
              res.should.be.json;
          done();
        });
    });
  });

  describe('/POST parcel delivery orders', () => {
    it('should post a parcel delivery order', (done) => {
      let newOrder = {
        placedBy: req.body.placedBy,
        weight: req.body.weight,
        weightmetric: req.body.weightmetric,
        sentOn: req.body.sentOn,
        deliveredOn: req.body.deliveredOn,
        status: req.body.status,
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        currentLocation: req.body.currentLocation
      };
      chai.request(app)
          .post('/api/v1/parcels')
          .send(newOrder)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('placedBy');
            res.body.should.have.property('weight');
            res.body.should.have.property('weightmetric');
            res.body.should.have.property('sentOn');
            res.body.should.have.property('status');
            res.body.should.have.property('fromAddress');
            res.body.should.have.property('toAddress');
            res.body.should.have.property('currentLocation');
            done();
          });
    });
  });

  // describe('/GET/:id', () => {
  //   it('it should get parcel with specific ID', () => {
  //     let newOrder = {
  //       item_name: 'Bag',
  //       weight: 6,
  //       from: 'Onitsha',
  //       destination: 'Owerri'
  //     }
  //     let orderId = 2;
  //     const url = `/api/v1/parcels/:${orderId}`
  //     chai.request(app)
  //       .get(url)
  //       .send(newOrder)
  //       .end((err, res) => {
  //         console.log(res.body)
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('id');
  //         res.body.should.have.property('item_name');
  //         res.body.should.have.property('weight');
  //         res.body.should.have.property('from');
  //         res.body.should.have.property('destination');
  //       })
  //   })
  // })
  
});

