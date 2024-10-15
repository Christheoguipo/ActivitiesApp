import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {

  const { activityStore } = useStore();
  const { activityList, loadActivities } = activityStore;

  useEffect(() => {
    if (activityList.size <= 1) loadActivities();
  }, [activityList.size, loadActivities]);

  if (activityStore.isLoadingList) {
    return (<LoadingComponent content="Loading content" />);
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        TODO: Activities Filter here!!
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
