import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import img from './let-it-mow-logo.png';


export class Footer extends Component {

  render() {

    return (
      <div className='flex-nav-footer'>
         <Link to='/'><img className='footer-logo' src={img} /></Link>
         <p className='footer-motto'>Rent secondhand yard equipment in the United States quickly,
         safely and locally on Let it Mow. Start making money today!</p>
         <p className='footer-copyright'>&copy; Copyright 2017 All rights reserved. Let it Mow <Link to='/terms'>Terms
         & Conditions</Link> and Privacy Policy</p>
      </div>
    )
}
}
const mapStateToProps = (state, props) => ({
  name: state.listings.name
});

export default connect(mapStateToProps)(Footer);
