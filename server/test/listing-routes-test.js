const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const mongoose =  require('mongoose');

const {app, runServer, closeServer} = require('../index');
const Listing =  require('../models/listing');

const testDatabase = global.secret.TEST_DATABASE_URL;

chai.use(chaiHttp);

describe('Listing model', () => {
  it('should exist', () => {
    expect(Listing).to.not.be.undefined;
  });
});

function seedListingData() {
  console.info('seeding listing data');
  const seedData = [];
  for (let i=1; i<10; i++) {
    console.log(generateListingData());
    seedData.push(generateListingData());
  }
  console.log('Seed data', seedData);
  return Listing.insertMany(seedData);
}

function generateTitles() {
  const titles = [
    'Riding Lawn Mower', 'Gas Push Mower', 'Reel Lawn Mower',
    'Commercial Pressure Washer', 'Cordless Hedge Trimmer', 'Power Lawn Edger'
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function generatePrices() {
  const prices = [
    10, 15, 20, 25, 8, 13
  ];
  return prices[Math.floor(Math.random() * prices.length)];
}

function generateUsers() {
  const users = [ 4897598347539847597, 8943759348759384759,
                  8943759834759832475, 1938593798374648704,
                  9032846838746785467, 8734762346234998489
  ];
  return users[Math.floor(Math.random() * users.length)];
}

function generateListingData() {
  return{
    title: generateTitles(),
    price: generatePrices(),
    createdBy: generateUsers()
  };
}

function teardownDb() {
  console.warn('Deleting detabase');
  return mongoose.connection.dropDatabase();
}

describe('Listing', () => {

  before(() => {
    return runServer(testDatabase);
  });

  beforeEach(() => {
    return seedListingData();
  });

  afterEach(() => {
    return teardownDb();
  });

  after(() => {
    return closeServer(testDatabase);
  });

  describe('listing Get endpoint', () => {
    it('should return all listings', (done)=> {
        return chai.request(app)
        .get('/api/listings')
        .then((res) => {
          expect(res).have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.at.least(1);
          res.body.forEach(item => {
            expect(item).to.be.an('object');
            expect(item).to.have.keys(['title', 'price', 'createdBy']);
          });
        });
    });
  });
});
