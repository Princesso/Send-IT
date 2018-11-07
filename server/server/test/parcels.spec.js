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
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.should.be.json;
          done();
        });
    });
  });

  describe('/POST parcel delivery orders', () => {
    it('should post a parcel delivery order', (done) => {
      let newOrder = {
        item_name: 'Bag',
        weight: 6,
        from: 'Yaba',
        destination: 'Enugu'
      }
      chai.request(app)
          .post('/api/v1/parcels')
          .send(newOrder)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('id');
            res.body.should.have.property('item_name');
            //res.body.should.have.property('weight');
            res.body.should.have.property('from');
            res.body.should.have.property('destination');
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

