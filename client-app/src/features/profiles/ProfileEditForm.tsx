import { Formik } from 'formik'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import { Button, Form } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import MyTextArea from '../../app/common/form/MyTextArea'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup';

interface Props {
  setEditMode: (editMode: boolean) => void
}

const ProfileEditForm = ({ setEditMode }: Props) => {

  const { profileStore: { profile, editProfile } } = useStore();

  const handleSubmit = (values: Partial<Profile>) => {
    editProfile(values).then(() => {
      setEditMode(false);
    });
  }

  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={Yup.object({
        displayName: Yup.string().required()
      })}
    >
      {({ handleSubmit, isValid, dirty, isSubmitting }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete='off' >
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="bio" placeholder="Bio" rows={3} />

          <Button
            disabled={isSubmitting || !isValid || !dirty}
            loading={isSubmitting}
            type="submit" floated="right" positive content="Update Profile" />
        </Form>
      )}
    </Formik>
  )
}

export default observer(ProfileEditForm)