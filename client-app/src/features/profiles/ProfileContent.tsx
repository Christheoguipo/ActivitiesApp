import { observer } from 'mobx-react-lite'
import { Tab, TabPane } from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos'
import { Profile } from '../../app/models/profile'
import ProfileAbout from './ProfileAbout'
import ProfileFollowings from './ProfileFollowings'
import { useStore } from '../../app/stores/store'

interface Props {
  profile: Profile
}

const ProfileContent = ({ profile }: Props) => {

  const { profileStore: { setActiveTab } } = useStore();

  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <TabPane>Events content</TabPane> },
    { menuItem: 'Followers', render: () => <ProfileFollowings /> },
    { menuItem: 'Following', render: () => <ProfileFollowings /> },
  ]

  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes}
      onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
    />
  )
}

export default observer(ProfileContent)