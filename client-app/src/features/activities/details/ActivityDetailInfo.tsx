import { Grid, Icon, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from 'date-fns';

interface Props {
  activity: Activity
}

const ActivityDetailInfo = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="info" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{format(activity.date!, 'dd MMM yyy hh:mm aa')}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="map marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{`${activity.venue}, ${activity.city}`}</p>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  )
}

export default ActivityDetailInfo