import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import img from './let-it-mow-logo.png';
import FontAwesome from 'react-fontawesome';


export class Footer extends Component {

  render() {

    return (
      <div className='flex-nav-footer'>
         <Link to='/'><img className='footer-logo' src={img} alt="let it mow goat logo"/></Link>
         <div className='footer-content'>
         <a href='https://github.com/Jean-Luc19/let-it-mow' className='twitter-logo faicon' aria-label="link to let it mow on twitter">
           <FontAwesome className='fa fa-twitter-square' size='2x' aria-hidden='true'/></a>
         <a href='https://github.com/Jean-Luc19/let-it-mow' className='facebook-logo faicon' aria-label="link to let it mow on github">
           <FontAwesome className='fa fa-facebook-square' size='2x' aria-hidden='true'/></a>
         <a href='https://github.com/Jean-Luc19/let-it-mow' className='email-logo faicon' aria-label="email link">
           <FontAwesome className='fa fa-envelope-square' size='2x' aria-hidden='true'/></a>
         <p className='footer-motto'>Rent secondhand yard equipment in the United States quickly,
         safely and locally on Let it Mow. Start making money today!</p>
         <p className='footer-copyright'>&copy; Copyright 2017 All rights reserved. Let it Mow <Link to='/terms'>Terms
         & Conditions</Link></p>
         </div>
      </div>
    );
}
}
const mapStateToProps = (state, props) => ({
  name: state.listings.name
});

export default connect(mapStateToProps)(Footer);
