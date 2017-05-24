import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConversations } from '../../actions';

import ConvoBox from './convo-box';
import '../../styles/chat-styles.css';


class ChatContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchConversations();
  }

  render() {
    const { conversations } = this.props;
    console.log(conversations);
    if (!conversations) {
      return <div>...Loading</div>;
    }

    const rooms = conversations.length > 0 ? conversations.map(room => {
      if (room.message.length > 0) {
        return  <ConvoBox listing={room.listing} message={room.message[0]} key={room.message[0]._id}/>;
      }
    }) : <div className="convo-box">
          <div>
            <h2>It doesnt look like you have any active conversations.</h2>
          </div>
        </div>;

    return (
      <div className="wrapper">
        <div className="row">
            {rooms}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conversations: state.chat.conversations,
  name: state.listings.name
});

export default connect(mapStateToProps, { fetchConversations })(ChatContainer);
