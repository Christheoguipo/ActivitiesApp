import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - We couldn't find what you're looking for!
      </Header>
      <Button as={Link} to='/activities' >Return to Activities page</Button>
    </Segment>
  )
}

export default NotFound