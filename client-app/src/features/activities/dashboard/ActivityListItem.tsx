import { Button, Icon, Item, Label, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import { Link } from "react-router-dom"
import { format } from 'date-fns';
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
  activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {

  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled &&
          <Label attached="top" color="red" content="Cancelled" style={{ textAlign: 'center' }} />
        }
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" style={{ alignSelf: 'start' }} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`} >{activity.title}</Item.Header>
              <Item.Description>Hosted by {activity.host?.displayName}</Item.Description>
              {activity.isHost &&
                (<Item.Description>
                  <Label basic color="orange">You are hosting this event.</Label>
                </Item.Description>
                )}
              {activity.isGoing && !activity.isHost &&
                (<Item.Description>
                  <Label basic color="teal">You are going to this event.</Label>
                </Item.Description>
                )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <Icon name="calendar" />{format(activity.date!, 'dd MMM yyyy')}
        <span> | </span>
        <Icon name="map marker alternate" />{activity.venue}
      </Segment>

      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>

      <Segment clearing>

        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />

      </Segment>
    </Segment.Group >
  );

}

export default ActivityListItem