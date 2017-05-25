const mongoose =  require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');


const should = chai.should();
const expect = require('chai').expect;


const {app, runServer, closeServer} = require('../index');
const Listing =  require('../models/listing');
const User =  require('../models/user');
const userData = require('./models-test');

const testDatabase = global.secret.TEST_DATABASE_URL;

chai.use(chaiHttp);

describe('Listing model', () => {
  it('should exist', () => {
    expect(Listing).to.not.be.undefined;
  });
});

function seedListingData() {
  console.info('seeding listing data');
  userData.seedUserData();
  const seedData = [];

  for (let i=1; i<10; i++) {
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

function generateDescription() {
  const description = [
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    'Sed diam nonummy nibh euismod tincidunt ut laoreet dolore.',
    'Ut wisi enim ad minim veniam, quis nostrud exerci tation.',
    'Ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
    'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse'
  ];
  return description[Math.floor(Math.random() * description.length)];
}

function generatePrices() {
  const prices = [ 10, 15, 20, 25, 8, 13 ];
  return prices[Math.floor(Math.random() * prices.length)];
}

function generateImages() {
  const images = [ '4897598347539847597', '8943759348759384759',
                  '8943759834759832475', '1938593798374648704',
                  '9032846838746785467', '8734762346234998489'
                ];
  return images[Math.floor(Math.random() * images.length)];
}

function generateZipcode() {
  const zipcode = [ 80014, 80123, 80202, 80207, 80218 ];
  return zipcode[Math.floor(Math.random() * zipcode.length)];
}

function generateIds() {
  const id = [ 8429014017, 3417359685, 2710764371, 5374131291, 2731188411,
               3026739410, 1461977045, 4135575380, 6638124817, 1483178215
             ];
  return id[Math.floor(Math.random() * id.length)];
}


function generateListingData() {
  console.log('find one', User.findOne());
  return {
    createdBy: generateIds(),
    title: generateTitles(),
    price: generatePrices(),
    desciption: generateDescription(),
    zipcode: generateZipcode(),
    images: generateImages(),
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
    console.log('testing 1!!!!');
    it('should return all listings', () => {
        console.log('testing 2!!!!');
        chai.request(app)
        .get('/api/listings')
        .then((res) => {
          console.log('testing 3!!!!');
          res.should.have.status(200);
          expect(res).to.be.json;
          expect(res.body.length).to.be.at.least(1);
          res.body.forEach(item => {
            expect(item).to.be.an('object');
            expect(item).to.have.keys(['title', 'description', 'price', 'createdBy']);

            return Listing.count();
          });
        });
    });
  });
});
