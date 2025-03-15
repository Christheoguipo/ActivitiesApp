import { observer } from 'mobx-react-lite'
import { Button, Reveal } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import { SyntheticEvent } from 'react';

interface Props {
  profile: Profile;
}

const FollowButton = ({ profile }: Props) => {

  const { userStore, profileStore } = useStore();
  const { updateFollowing, isButtonLoading } = profileStore;

  const handleFollowToggle = (e: SyntheticEvent, username: string) => {
    e.preventDefault();

    if (profile.following)
      updateFollowing(username, false);
    else
      updateFollowing(username, true);
  }

  if (profile.username === userStore.user?.username) return null;

  return (
    <Reveal animated='move'>
      <Reveal.Content visible style={{ width: '100%' }}>
        <Button fluid color='teal'
          content={profile.following ? 'Following' : 'Not following'} />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: '100%' }}>
        <Button fluid basic
          color={profile.following ? 'red' : 'green'}
          content={profile.following ? 'Unfollow' : 'Follow'}
          loading={isButtonLoading}
          onClick={(e) => handleFollowToggle(e, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  )
}

export default observer(FollowButton)