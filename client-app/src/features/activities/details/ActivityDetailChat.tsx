import { Button, Comment, FormTextArea, Segment, Form, Header } from "semantic-ui-react"

const ActivityDetailChat = () => {
  return (
    <Segment.Group>
      <Segment attached="top" inverted textAlign="center" color="teal" style={{ border: 'none' }}>
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <FormTextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
      </Segment>
    </Segment.Group>
  )
}

export default ActivityDetailChat
