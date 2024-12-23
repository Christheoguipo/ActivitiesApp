import { Button, Icon, Item, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import { Link } from "react-router-dom"
import { format } from 'date-fns';

interface Props {
  activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>

            <Item.Image size="tiny" circular src="/assets/user.png" ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`} >{activity.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
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
        Atendees
      </Segment>

      <Segment clearing>

        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />

      </Segment>
    </Segment.Group >
  );

}

export default ActivityListItem