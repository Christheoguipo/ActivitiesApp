import { useEffect } from 'react';
import { Button, Comment, Segment, Header } from "semantic-ui-react"
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { observer } from 'mobx-react-lite';

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

      <Segment attached clearing>
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

          <Formik
            onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
            initialValues={{ body: '' }}
          >
            {({ isSubmitting, isValid }) => (
              <Form className='form ui' >
                <MyTextArea placeholder='Add comment' name='body' rows={2} />
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                  type='submit'
                  floated='right'
                />
              </Form>
            )}
          </Formik>


        </Comment.Group>
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityDetailChat)
