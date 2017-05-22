import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConversations } from '../../actions';
import { Link } from 'react-router-dom';
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

    const rooms = conversations.map(room => {
      const pic = `http://res.cloudinary.com/letitmow/image/upload/w_250,h_200/${room.listing.images[0]}.jpg`;
      if (room.message[0].body != undefined) {
        return (
            <div className="col-8">
              <Link to={`/chat/${room.message[0].conversationId}`}>
                <div className="convo-box" key={room.message[0].conversationId}>
                    <div>
                      Chat with {room.message[0].author.name} about {room.listing.title}</div>
                    <div className="user-photo">
                      <img src={pic} />
                    </div>
                </div>
              </Link>
            </div>
        );
      }
    });

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
