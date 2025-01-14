import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

interface Props {
  activity: Activity
}

const dimmedImageStyle = {
  filter: 'brightness(30%)',
}

const textOnImageStyle = {
  left: '5%',
  bottom: '5%',
  position: 'absolute',
  width: '100%',
  height: 'auto',
  color: 'white',
}

const ActivityDetailHeader = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0px' }}>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={dimmedImageStyle} />
        <Segment basic style={textOnImageStyle}>
          <Item.Group>
            <Item>
              <Item.Content >
                <Header size="huge" content={activity.title} style={{ color: 'white' }} />
                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                <p>Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong></p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

      </Segment>
      <Segment attached='bottom' clearing>
        {activity.isHost ? (
          <Button as={Link} to={`/manage/${activity.id}`} color="orange" content='Manage Event' floated="right" />
        ) : activity.isGoing ? (
          <Button content='Cancel attendance' />
        ) : (
          <Button color="teal" content='Join Activity' />
        )}
      </Segment>
    </Segment.Group>
  )
}

export default ActivityDetailHeader