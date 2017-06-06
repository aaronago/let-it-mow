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

describe('Listing model', function() {
  it('should exist', function() {
    expect(Listing).to.not.be.undefined;
  });
});

function seedUserData() {
    console.info('seeding User data');
    const seedData = [];
    for (let i=0; i<9; i++) {
      seedData.push(generateUserData(i));
    }
    //console.log('Seed data', seedData);
    for (let i=0; i<seedData.length; i++) {
      User.create(seedData[i], function(err, user){
        console.log('sedding user', user);
      });
    }
    User.find().exec().then(function(users){
      console.log('finding users', users);
    });
  };

  function generateGoogleId(i) {
    const googleId = [ 4897598347539847597, 8943759348759384759,
                       8943759834759832475, 1938593798374648704,
                       9032846838746785467, 8734762346234998489,
                       6897598347539847597, 2943759348759384759,
                       1943759834759832475, 3938593798374648704,
                     ];
    return googleId[i];
  }

  function generateProfilePic() {
    const profPic = [ '4897598347539847597', '8943759348759384759',
                    '8943759834759832475', '1938593798374648704',
                    '9032846838746785467', '8734762346234998489'
                  ];
    return profPic[Math.floor(Math.random() * profPic.length)];
  }

  function generateAccessToken() {
    const token = [ 'ya29.GttIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
                   'ya29.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW6_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
                   'ya29.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50i6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
                   'ya30.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
                   'ya29.HltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
                   'ya29.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4h'
                  ];
    return token[Math.floor(Math.random() * token.length)];
  }

  function generateName() {
    const name = [ 'Laura', 'Joan',
                    'Jane', 'John',
                    'Tim', 'Tammy'
                  ];
    return name[Math.floor(Math.random() * name.length)];
  }


  function generateUserData(i) {
    return {
              googleID: generateGoogleId(i),
              name: generateName(),
              profilePic: generateProfilePic(),
              accessToken: generateAccessToken()

            };
  }

function seedListingData() {
  console.info('seeding listing data');
  seedUserData();
  const seedData = [];
  for (let i=1; i<10; i++) {
    seedData.push(generateListingData());
  }
  //console.log('Seed data', seedData);
  //return Listing.insertMany(seedData);
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
   User.findOne().exec()
    .then(function(user) {
      console.log('user', user);
      return {
        createdBy: user,
        title: generateTitles(),
        price: generatePrices(),
        desciption: generateDescription(),
        zipcode: generateZipcode(),
        images: generateImages(),
      };
    });
}

function teardownDb() {
  console.warn('Deleting detabase');
  return mongoose.connection.dropDatabase();
}

describe('Listing', function() {

  before(function() {
    return runServer(testDatabase);
  });

  beforeEach(function() {
    return seedListingData();
  });

  // afterEach(function() {
  //   return teardownDb();
  // });

  after(function() {
    return closeServer(testDatabase);
  });

  it('should return all listings', function(done) {
      return chai.request(app)
      .get('/api/listings')
      .then(function(res) {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body.length).to.be.at.least(1);
        res.body.forEach(function(item) {
          expect(item).to.be.an('object');
          expect(item).to.have.keys(['title', 'description', 'price', 'createdBy']);

        });
        done();
      });
    });
});
