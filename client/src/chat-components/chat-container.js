import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConversations } from '../actions';
import { Link } from 'react-router-dom';



class ChatContainer extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchConversations();
  }

  render() {
    console.log(this.props.conversations);

    const rooms = this.props.conversations.map(room => {
      return (
        <div key={room.listing._id}>
          <Link to={`/chat/${room.message[0].conversationId}`}>
            <li>Chat with {room.message[0].author.name} about {room.listing.title}</li>
          </Link>
        </div>
      );
    });

    return (
      <div>
        {rooms}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  conversations: state.chat.conversations
});

export default connect(mapStateToProps, { fetchConversations })(ChatContainer);
