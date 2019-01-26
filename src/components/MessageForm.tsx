import * as React from 'react';
import { postMessage, Message } from '../client';
import Axios, { CancelTokenSource } from 'axios';
import { Button, Form, Segment, TextArea } from 'semantic-ui-react';

interface MessageFormProps {
  channelName: string;
  onSubmit: (channelName: string, message: Message) => void;
}

interface MessageFormState {
  body?: string;
}

export class MessageForm extends React.Component<
  MessageFormProps,
  MessageFormState
> {
  constructor(props: MessageFormProps) {
    super(props);
    this.state = {
      body: ''
    };
  }

  handleTextAreaChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    this.setState({ body: event.currentTarget.value });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const channelName = this.props.channelName;
    const payload: Message = {
      body: this.state.body
    };
    this.props.onSubmit(channelName, payload);
    this.setState({ body: '' });
  };

  render() {
    return (
      <Segment basic textAlign="center">
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <TextArea
              autoHeight
              placeholder="Write your message"
              value={this.state.body}
              onChange={this.handleTextAreaChange}
            />
          </Form.Field>
          <Button primary type="submit">
            Send
          </Button>
        </Form>
      </Segment>
    );
  }
}
