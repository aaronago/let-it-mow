import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryListing from './gallery-listing';
import Slider, {Range} from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

function log(value) {
  return value
}
class HomepageListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      value: [0,50]
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
  }
  handleChange(e){
    this.setState({searchString:e.target.value});
    }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }

  render() {

    let listings = this.props.listings
    let searchString = this.state.searchString.trim().toLowerCase();
    let lowPrice = this.state.value[0]
    let highPrice = this.state.value[1]
    let marks = {
      10: '$10',
      20: '$20',
      30: '$30',
      40: '$40',
      50: '$50'
    }

    if(searchString.length > 0){
        listings = listings.filter(function(l){
        return l.title.toLowerCase().match(searchString);
        });
    }
    if(lowPrice > 0 && highPrice < 10) {
         listings = listings.filter(function(l) {
           return l.price < 10
         })
    }
    if(lowPrice > 0 && highPrice < 20) {
         listings = listings.filter(function(l) {
           return l.price < 20
         })
    }
    if(lowPrice > 0 && highPrice < 30) {
         listings = listings.filter(function(l) {
           return l.price < 30
         })
    }
    if(lowPrice > 0 && highPrice < 40) {
         listings = listings.filter(function(l) {
           return l.price < 40
         })
    }

    return (
    <div className="wrapper equip-display">
      <div className="row">
        <div className="col-3 equip-search">
          <input className="" type="text" value={this.state.searchString}
          onChange={this.handleChange} placeholder="Search Equipment"/>
        </div>
        <div className="col-4 filter">
          <h4 className='filter-title'>Filter By Price</h4>
          <p className='price-text'>{`$${lowPrice} to $${highPrice} /day`}</p>
          <Range className=''
                //  marks={marks}
                 maximumTrackStyle={{ backgroundColor: '#3a6951', height: 10 }}
                 minimumTrackStyle={{ backgroundColor: 'green', height: 10 }}
                 handleStyle={{borderColor: 'green'}}
                 min={5}
                 max={50}
                 dots={false}
                 defaultValue={[10,50]}
                 allowCross={false}
                 value={this.state.value}
                 tipFormatter={value => `${value} $`}
                 onChange={this.onSliderChange}
           />
        </div>
      </div>
      <div className="row listing-card">
        <div className='row listing-card-container'>
      {listings.map(card => {
        return (

          <GalleryListing key={card._id} created={card.createdAt} images={card.images} title={card.title}
           price={card.price} id={card._id}/>
       )}
     )}
         </div>
      </div>
    </div>
   )
  }
}

const mapStateToProps = (state, props) => ({
  listings: state.listings.listings
});

export default connect(mapStateToProps)(HomepageListings);
