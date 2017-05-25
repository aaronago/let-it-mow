import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { fetchConversations, fetchUser } from '../../actions';

import ConvoBox from './convo-box';
import '../../styles/chat-styles.css';


class ChatContainer extends Component {

  componentDidMount() {
    this.props.fetchConversations();
    this.props.fetchUser();
  }

  render() {
    if (!this.props.conversations) {
      return <div>...Loading</div>;
    }
    const { conversations } = this.props;

    const rooms = conversations.length > 0 ? conversations.map(room => {
      if (room.message.length > 0) {
        return  <ConvoBox userId={this.props.userId} listing={room.listing} message={room.message[0]} key={room.message[0]._id}/>;
      }
    }) : <div className="convo-box">
          <div>
            <h2>It doesnt look like you have any active conversations.</h2>
          </div>
        </div>;

    return (
      <div className="wrapper">
        <h2>Here Are Your Open Conversations</h2>
        <div className="row">

            <CSSTransitionGroup style={{width: "90%"}}
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>
              {rooms}
            </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conversations: state.chat.conversations,
  name: state.listings.name,
  userId: state.listings._id
});

export default connect(mapStateToProps, { fetchConversations, fetchUser })(ChatContainer);
