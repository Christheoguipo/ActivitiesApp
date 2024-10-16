import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ActivityDetails = () => {

  const { id } = useParams();
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, isLoadingList } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (!activity || isLoadingList) return (<LoadingComponent />);

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths={2}>
          <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit"></Button>
          <Button as={Link} to='/activities' basic color="grey" content="Cancel" ></Button>
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default observer(ActivityDetails);
