import React, { Component } from 'react';

import io from 'socket.io-client';



class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.conversationId) {
        this.socket.emit('enter conversation', this.props.match.params.conversationId);

    }
  }

  componentWillMount() {
      this.socket = io('http://localhost:4000');
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
    this.socket.emit('leave conversation', this.props.match.params.conversationId);
  }
}

export default ChatRoom;
