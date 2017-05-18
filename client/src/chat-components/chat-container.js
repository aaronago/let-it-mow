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

    const rooms = this.props.conversations.map(room => {
      return (
        <div key={room.listing}>
          <Link to={`/chat/${room.listing}`}>
            {room.listing}
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
