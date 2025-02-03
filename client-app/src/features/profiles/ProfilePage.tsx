import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { useEffect } from 'react'
import LoadingComponent from '../../app/layout/LoadingComponent'

const ProfilePage = () => {

  const { username } = useParams();
  const { profileStore } = useStore();
  const { profile, isLoadingProfile, loadProfile } = profileStore;

  useEffect(() => {
    if (username)
      loadProfile(username);
  }, [loadProfile, username]);

  if (isLoadingProfile)
    return (<LoadingComponent content='Loading profile...' />)

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile &&
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        }
      </Grid.Column>
    </Grid>
  )
}

export default observer(ProfilePage)