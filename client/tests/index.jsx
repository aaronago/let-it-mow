var TestUtils = require('react-addons-test-utils');
var React = require('react');

var should = require('chai').should();


describe('User dashboard', function() {
  it('should render all user listings given', function () {

    const renderer = TestUtils.createRenderer();
    const listings = [{
    "_id": "591367f802291cd40f1a23be",
    "title": "electric weeder with images",
    "price": 23,
    "position": {
      "lat": 39.7316982,
      "lon": -104.9213643
    },
    "__v": 0,
    "images": [
      "e0cr4u1mqb6e6gwlctvz"
    ],
    "categories": []
  }]
    renderer.render(<UserDashboard listings={listings} />);
    const result = renderer.getRenderOutput();
    results.props.listings.should.be.an('array')
  })
})
