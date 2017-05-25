const mongoose =  require('mongoose');
const expect = require('chai').expect;
const User =  require('../models/user');


describe('User', () => {
  it('should be an object', () => {
    const User = require('../models/user');
    expect(User).to.not.be.undefined;
  });
});

module.exports = {
  seedUserData: function () {
    console.info('seeding User data');
    const seedData = [];
    for (let i=1; i<10; i++) {
      seedData.push(generateUserData(i));
    }console.log('Seed data', seedData);
    return User.insertMany(seedData);
  }
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

function generateId(i) {
  const id = [ 8429014017, 3417359685, 2710764371, 5374131291, 2731188411,
               3026739410, 1461977045, 4135575380, 6638124817, 1483178215
             ];
  return id[i];
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
            _id: generateId(i),
            googleID: generateGoogleId(i),
            name: generateName(),
            profilePic: generateProfilePic(),
            accessToken: generateAccessToken()

          };
}
