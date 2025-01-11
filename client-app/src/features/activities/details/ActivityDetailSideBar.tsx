import { Link } from "react-router-dom"
import { Image, Item, Label, List, Segment } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile"

interface Props {
  attendees: Profile[];
}

const ActivityDetailSideBar = ({ attendees }: Props) => {
  return (
    <>
      <Segment attached='top' secondary inverted color="teal" textAlign="center" style={{ border: 'none' }}>
        {attendees.length} {attendees.length === 1 ? 'person' : 'people'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item style={{ position: 'relative' }} key={attendee.username}>
              <Label ribbon='right' color="orange" style={{ position: 'absolute' }}>Host</Label>
              <Image src={attendee.image || '/assets/user.png'} size="tiny" />
              <Item.Content verticalAlign="middle">
                <Item.Header as='h3'>
                  <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment >
    </>

  )
}

export default ActivityDetailSideBar