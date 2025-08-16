import { observer } from "mobx-react-lite"
import { UserActivity } from "../../app/models/profile";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Props {
  userActivity: UserActivity;
}

const ActivityCard = ({ userActivity }: Props) => {

  const dayMonth = new Date(userActivity.date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
  });
  
  const timeOnly = new Date(userActivity.date).toLocaleTimeString(undefined, {
    timeStyle: "short",
    hour12: true
  });

  return (
    <Card as={Link} to={`/activities/${userActivity.id}`} >
      <Image src={`/assets/categoryImages/${userActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header textAlign="center">{userActivity.title}</Card.Header>
        <Card.Meta textAlign="center">
          <div>{dayMonth}</div>
          <div>{timeOnly}</div>
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default observer(ActivityCard)