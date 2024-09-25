import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {

    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectedActivity();
    }

    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    if (activity.id) {
      // Edit
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    } else {
      // Create
      setActivities([...activities, { ...activity, id: uuid() }]);
    }

    setEditMode(false);
    setSelectedActivity(activity);
  }

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          activities={activities}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
