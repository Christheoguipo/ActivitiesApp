import { observer } from "mobx-react-lite"
import { Image, List, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile"
import { Link } from "react-router-dom"
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
  attendees: Profile[];
}

const ActivityListItemAttendee = ({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <Popup key={attendee.username} hoverable trigger={
          <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
            <Image size="mini" src={attendee.image || "/assets/user.png"} circular />
          </List.Item>
        } >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  )
}

export default observer(ActivityListItemAttendee)