import { observer } from 'mobx-react-lite'
import { Tab, TabPane } from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos'
import { Profile } from '../../app/models/profile'
import ProfileAbout from './ProfileAbout'

interface Props {
  profile: Profile
}

const ProfileContent = ({ profile }: Props) => {

  const panes = [
    { menuItem: 'About', render: () => <ProfileAbout profile={profile} /> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: 'Events', render: () => <TabPane>Events content</TabPane> },
    { menuItem: 'Followers', render: () => <TabPane>Followers content</TabPane> },
    { menuItem: 'Following', render: () => <TabPane>Following content</TabPane> },
  ]

  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} />
  )
}

export default observer(ProfileContent)