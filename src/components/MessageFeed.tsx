import * as React from 'react';
import { Segment, Image, Comment, Header } from 'semantic-ui-react';

import { fetchMessages, Message } from '../client';

interface MessageFeedProps {
  channelName: string;
  messages: Message[];
}

interface MessageFeedState {
  // messages?: Message[];
}

export class MessageFeed extends React.Component<
  MessageFeedProps,
  MessageFeedState
> {
  constructor(props: MessageFeedProps) {
    super(props);
    // this.state = {
    //   messages: []
    // };
  }

  // fetchMessages = (channelName: string) => {
  //   fetchMessages(channelName)
  //     .then(response => {
  //       const messages = response.data.messages;
  //       this.setState({ messages });
  //     })
  //     .catch(error => console.error);
  // };

  render() {
    return (
      <Comment.Group>
        <Header as="h3" dividing>
          {this.props.channelName}
        </Header>
        {this.props.messages
          .slice()
          .reverse()
          .map(message => {
            return (
              <Comment key={message.id}>
                <Comment.Avatar
                  src={message.user.avatar || '/img/avatar.png'}
                />
                <Comment.Content>
                  <Comment.Author as="a">@{message.user.name}</Comment.Author>
                  <Comment.Metadata>
                    <div>{message.date}</div>
                  </Comment.Metadata>
                  <Comment.Text>{message.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })}
      </Comment.Group>
    );
  }
}
