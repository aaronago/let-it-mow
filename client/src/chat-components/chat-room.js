import React, { Component } from 'react';

import io from 'socket.io-client';

const socket = io('http://localhost:3000');

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.conversationId) {
        socket.emit('enter conversation', this.props.match.params.conversationId);
    }
  }

  render() {
    console.log(this.props.match.params.conversationId);
    return (
      <div>
        Chat Room
      </div>
    );
  }

  componentWillUnmount() {
    socket.emit('leave conversation', this.props.match.params.conversationId);
  }
}

export default ChatRoom;
