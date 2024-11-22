import { Link } from "react-router-dom"
import { Image, Item, Label, List, Segment } from "semantic-ui-react"

const ActivityDetailSideBar = () => {
  return (
    <>
      <Segment attached='top' secondary inverted color="teal" textAlign="center" style={{ border: 'none' }}>
        3 people going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Label ribbon='right' color="orange" style={{ position: 'absolute' }}>Host</Label>
            <Image src='/assets/user.png' size="tiny" />
            <Item.Content verticalAlign="middle">
              <Item.Header as='h3'>
                <Link to={'#'}>Theo</Link>
              </Item.Header>
              <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: 'relative' }}>
            <Image src='/assets/user.png' size="tiny" />
            <Item.Content verticalAlign="middle">
              <Item.Header as='h3'>
                <Link to={'#'}>Matt</Link>
              </Item.Header>
              <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: 'relative' }}>
            <Image src='/assets/user.png' size="tiny" />
            <Item.Content verticalAlign="middle">
              <Item.Header as='h3'>
                <Link to={'#'}>Joe</Link>
              </Item.Header>
            </Item.Content>
          </Item>
        </List>
      </Segment >
    </>

  )
}

export default ActivityDetailSideBar