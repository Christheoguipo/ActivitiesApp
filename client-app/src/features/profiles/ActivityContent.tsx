import { observer } from "mobx-react-lite"
import { Card, TabPane } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityCard from "./ActivityCard";

const ActivityContent = () => {
  const { profileStore: { isLoadingActivities, userActivities } } = useStore();

  return (
    <TabPane loading={isLoadingActivities} >
      <Card.Group itemsPerRow={4} >
        {userActivities.length > 0 ? userActivities.map((userActivity) => (
          <ActivityCard key={userActivity.id} userActivity={userActivity} />
        ))
        : 
        <span>No Events found.</span>
      }
      </Card.Group>
    </TabPane>
  )
}

export default observer(ActivityContent)