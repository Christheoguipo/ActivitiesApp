import { Grid } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
}

const ActivityDashboard = ({
  activities, selectedActivity,
  selectActivity, cancelSelectedActivity,
  openForm, closeForm, editMode
}: Props) => {

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            openForm={openForm}
          ></ActivityDetail>
        )}
        {editMode &&
          <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
