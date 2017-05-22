import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConversations } from '../../actions';
import { Link } from 'react-router-dom';



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

    const rooms = conversations.map(room => {
      if (room.message[0].body != undefined) {
        return (

          <div key={room.message[0].conversationId}>
            <Link to={`/chat/${room.message[0].conversationId}`}>
              <li>Chat with {room.message[0].author.name} about {room.listing.title}</li>
            </Link>
          </div>
        );
      }
    });

    return (
      <div>
        {rooms}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  conversations: state.chat.conversations,
  name: state.listings.name
});

export default connect(mapStateToProps, { fetchConversations })(ChatContainer);
