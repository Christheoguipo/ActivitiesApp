import { useEffect } from 'react';
import { Button, Comment, FormTextArea, Segment, Form, Header } from "semantic-ui-react"
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';

interface Props {
  activitiyId: string;
}

const ActivityDetailChat = ({ activitiyId }: Props) => {

  const { commentStore } = useStore();

  useEffect(() => {
    if (activitiyId)
      commentStore.createHubConnection(activitiyId);

    return () => {
      commentStore.clearComments();
    }
  }, [commentStore, activitiyId])

  return (
    <Segment.Group>
      <Segment attached="top" inverted textAlign="center" color="teal" style={{ border: 'none' }}>
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`} >{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
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
