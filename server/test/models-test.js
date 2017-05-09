const expect = require('chai').expect;

describe('User', () => {
  it('should be an object', () => {
    const User = require('../models/user');
    expect(User).to.not.be.undefined;
  });
});
