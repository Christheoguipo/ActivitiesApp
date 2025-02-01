import { Tab, TabPane } from 'semantic-ui-react'

const ProfileContent = () => {

  const panes = [
    { menuItem: 'About', render: () => <TabPane>About content</TabPane> },
    { menuItem: 'Photos', render: () => <TabPane>Photos content</TabPane> },
    { menuItem: 'Events', render: () => <TabPane>Events content</TabPane> },
    { menuItem: 'Followers', render: () => <TabPane>Followers content</TabPane> },
    { menuItem: 'Following', render: () => <TabPane>Following content</TabPane> },
  ]

  return (
    <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} />
  )
}

export default ProfileContent