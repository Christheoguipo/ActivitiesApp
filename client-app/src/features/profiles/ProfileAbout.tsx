import { useState } from 'react';
import { useStore } from '../../app/stores/store';
import { Button, Grid, Header, TabPane } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';

interface Props {
  profile: Partial<Profile>
}

const ProfileAbout = ({ profile }: Props) => {

  const [editMode, setEditMode] = useState(false);
  const { profileStore: { isCurrentUser } } = useStore();

  return (
    <TabPane>
      <Grid>
        <Grid.Column width={16}>

          <Header floated='left' content={`About ${profile.displayName}`} icon={'user'} />
          {isCurrentUser &&
            <Button floated='right' basic content={editMode ? 'Cancel' : 'Edit Profile'} onClick={() => setEditMode(!editMode)} />
          }
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile.bio}</span>
          )}
        </Grid.Column>

      </Grid>

    </TabPane>
  )
}

export default observer(ProfileAbout)