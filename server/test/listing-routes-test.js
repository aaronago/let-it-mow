const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../index');

chai.use(chaiHttp);

describe('Listing model', () => {
  it('should exist', () => {
    const Listing = require('../models/listing');
    expect(Listing).to.not.be.undefined;
  });
});

// describe('Listing', () => {
//
//   before(() => {
//     return runServer();
//   });
//
//   after(() => {
//     return closeServer();
//   });
//
//   it('should list listings on GET', (done)=> {
//       return chai.request(app)
//       .get('/api/listings')
//       .then((res) => {
//         expect(res).have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.an('array');
//         expect(res.body.length).to.be.at.least(1);
//         res.body.forEach(item => {
//           expect(item).to.be.an('object');
//           expect(item).to.have.keys(['title', 'price', 'createdBy']);
//         });
//         done();
//       });
//   });
// });
