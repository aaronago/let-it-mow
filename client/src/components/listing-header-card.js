import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startConversation } from '../actions';


class ListingHeaderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sent: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      listingId: this.props.listing._id,
      createdBy: this.props.listing.createdBy._id,
      message: this.state.text
    };
    this.props.startConversation(data);
    this.setState({text: '', sent: true});
  }



  render() {
    const { listing } = this.props;

    const sentMessage = <div className="col-6">
                                      <p>{listing.createdBy.name} has received your message</p>
                                      <Link to="/chat">
                                      <i className="ion-paper-airplane sent-plane"></i>
                                      </Link>
                                    </div>;

    const form =  <form action="" onSubmit={this.onSubmit}>
                                      <input className='single-page-chat' type="text" value={this.state.text} placeholder='Type Message...' autoFocus='true' onChange={this.onInputChange}/>
                                      <input className='btn-square chat-with-button' type="submit" value={`Send Chat To ${listing.createdBy.name}`}/>
                                    </form>;

    return (
      <div className='chat-row-single'>
        <h1>${listing.price} / Day</h1>
        <h2 className='single-listing-title'>{listing.title}</h2>
        <CSSTransitionGroup
          transitionName="flip"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {this.state.sent ? sentMessage : ''}
          {this.state.sent ? '': form}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default connect(null, { startConversation })(ListingHeaderCard);
