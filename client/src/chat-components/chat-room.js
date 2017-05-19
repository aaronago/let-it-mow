import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConversation, sendReply } from '../actions/index';
import io from 'socket.io-client';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
      this.socket = io();
  }

  componentDidMount() {
    const id = this.props.match.params.conversationId;
    this.props.fetchConversation(id);
    this.socket.emit('enter conversation', id);
  }

  onSubmit(e) {
    e.preventDefault();
    this.socket.emit('new message', this.props.match.params.conversationId);
    const replyData = {
      body: this.state.text,
      conversationId: this.props.match.params.conversationId
    };
    this.props.sendReply(replyData);
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  render() {
    const divStyle = {
      margin: "50px"
    };
    this.socket.on('refresh messages', () => {
    console.log("refresh sent through server");
    this.props.fetchConversation(this.props.match.params.conversationId);
    });
    const messages = this.props.messages.map(message => {
      return <li key={message._id}>{message.body}</li>;
    });

    return (
      <div style={divStyle}>
          <form onSubmit={this.onSubmit}>
            <input type="text" onChange={this.handleChange.bind(this)}/>
            <input type="submit" value="Send Message"/>
          </form>
          <ul>
            {messages}
          </ul>
      </div>
    );
  }

  componentWillUnmount() {
    this.socket.emit('leave conversation', this.props.match.params.conversationId);
  }
}

const mapStateToProps = state => ({
  messages: state.chat.messages
});

export default connect(mapStateToProps, { fetchConversation, sendReply })(ChatRoom);
