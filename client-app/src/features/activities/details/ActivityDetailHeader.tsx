import { Button, Header, Image, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

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

  const { activityStore: { isLoadingButton, updateAttendance, cancelActivityToggle } } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        {activity.isCancelled &&
          <Label
            style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
            ribbon color='red' content='Cancelled' />}
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
          <>
            <Button disabled={activity.isCancelled} as={Link} to={`/manage/${activity.id}`} color="orange" content='Manage Event' floated="right" />
            <Button
              basic
              floated="left"
              loading={isLoadingButton}
              onClick={cancelActivityToggle}
              color={activity.isCancelled ? 'green' : 'red'}
              content={activity.isCancelled ? 'Re-activate activity' : 'Cancel activity'}
            />
          </>
        ) : activity.isGoing ? (
          <Button loading={isLoadingButton} onClick={updateAttendance} content='Cancel attendance' />
        ) : (
          <Button disabled={activity.isCancelled} loading={isLoadingButton} onClick={updateAttendance} color="teal" content='Join Activity' />
        )}
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityDetailHeader)