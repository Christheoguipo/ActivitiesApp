import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'
import { CardGroup, Grid, GridColumn, Header, TabPane } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';

const ProfileFollowings = () => {
  const { profileStore } = useStore();
  const { profile, isLoadingFollowings, followings, activeTab } = profileStore;

  return (
    <TabPane loading={isLoadingFollowings}>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon={'user'} content={activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`} />
        </GridColumn>
        <GridColumn width={16}>
          <CardGroup itemsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  )
}

export default observer(ProfileFollowings)