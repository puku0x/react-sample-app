import * as React from 'react';
import { match } from 'react-router-dom';

import { fetchMessages, postMessage, Message } from '../client';
import { MessageFeed } from '../components/MessageFeed';
import { MessageForm } from '../components/MessageForm';

interface ChannelMatch {
  channelName: string;
}

interface ChannelProps {
  match: match<ChannelMatch>;
}

interface ChannelState {
  messages: Message[];
}

export class Channel extends React.Component<ChannelProps, ChannelState> {
  constructor(props: ChannelProps) {
    super(props);
    this.state = {
      messages: []
    };
  }

  fetchMessages = (channelName: string) => {
    fetchMessages(channelName)
      .then(response => {
        const messages = response.data.messages;
        this.setState({ messages });
      })
      .catch(error => console.error);
  };

  postMessage = (channelName: string, message: Message) => {
    postMessage(channelName, message)
      .then(response => {
        this.fetchMessages(channelName);
      })
      .catch(error => console.error);
  };

  componentDidUpdate(prevProps: ChannelProps) {
    const { channelName } = this.props.match.params;
    const { channelName: prevChannelName } = prevProps.match.params;

    if (prevChannelName && prevChannelName !== channelName) {
      this.fetchMessages(channelName);
    }
  }

  componentDidMount() {
    const { channelName } = this.props.match.params;
    this.fetchMessages(channelName);
  }

  render() {
    const { channelName } = this.props.match.params;
    return [
      <MessageFeed
        key="message-feed"
        channelName={channelName}
        messages={this.state.messages}
      />,
      <MessageForm
        key="message-form"
        channelName={channelName}
        onSubmit={this.postMessage}
      />
    ];
  }
}
