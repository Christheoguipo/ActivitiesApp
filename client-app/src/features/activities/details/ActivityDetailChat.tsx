import { useEffect } from 'react';
import { Comment, Segment, Header, Loader } from "semantic-ui-react"
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Field, FieldProps, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns';

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

        <Formik
          onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
          initialValues={{ body: '' }}
          validationSchema={Yup.object({
            body: Yup.string().required()
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className='form ui' >
              <Field name='body' >
                {(props: FieldProps) => (
                  <div style={{ position: 'relative' }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder='Enter you comment (Enter to submit, SHIFT + Enter to add new line)'
                      {...props.field}
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) {
                          return;
                        }
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (isValid)
                            handleSubmit();
                        }
                      }}
                    />

                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`} >{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

        </Comment.Group>
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityDetailChat)
