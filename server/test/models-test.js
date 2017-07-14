const mongoose =  require('mongoose');
const expect = require('chai').expect;
const User =  require('../models/user');


describe('User', function() {
  it('should not be undefined', function() {
    const User = require('../models/user');
    expect(User).to.not.be.undefined;
  });

  it('should be invalid if name is empty', function() {
    const u = new User();
    u.validate(function(err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });
});



// module.exports = function seedUserData() {
//     console.info('seeding User data');
//     const seedData = [];
//     for (let i=0; i<9; i++) {
//       seedData.push(generateUserData(i));
//     } console.log('Seed data', seedData);
//     for (let i=0; i<seedData.length; i++) {
//       User.create(seedData[i], function(err, user){
//         console.log('sedding user', user);
//       });
//     }
//   };

// function generateGoogleId(i) {
//   const googleId = [ 4897598347539847597, 8943759348759384759,
//                      8943759834759832475, 1938593798374648704,
//                      9032846838746785467, 8734762346234998489,
//                      6897598347539847597, 2943759348759384759,
//                      1943759834759832475, 3938593798374648704,
//                    ];
//   return googleId[i];
// }
//
// function generateProfilePic() {
//   const profPic = [ '4897598347539847597', '8943759348759384759',
//                   '8943759834759832475', '1938593798374648704',
//                   '9032846838746785467', '8734762346234998489'
//                 ];
//   return profPic[Math.floor(Math.random() * profPic.length)];
// }
//
// function generateAccessToken() {
//   const token = [ 'ya29.GttIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
//                  'ya29.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW6_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
//                  'ya29.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50i6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
//                  'ya30.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
//                  'ya29.HltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4f',
//                  'ya29.GltIBF9ZtvcJhqKzmBerMRw0YeZTNTTTq8rjHZ30ZQg9IrTFxRE50e6gvqVrOPfEsRb2LFUSmfulask_omW5_xSc-eg5RgcyRwhGkkQc9EEyCdZS9vB1g4_VEv4h'
//                 ];
//   return token[Math.floor(Math.random() * token.length)];
// }
//
// function generateName() {
//   const name = [ 'Laura', 'Joan',
//                   'Jane', 'John',
//                   'Tim', 'Tammy'
//                 ];
//   return name[Math.floor(Math.random() * name.length)];
// }
//
//
// function generateUserData(i) {
//   return {
//             googleID: generateGoogleId(i),
//             name: generateName(),
//             profilePic: generateProfilePic(),
//             accessToken: generateAccessToken()
//
//           };
// }
