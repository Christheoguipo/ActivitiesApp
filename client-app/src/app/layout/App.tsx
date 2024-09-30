import { useEffect, useState } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";

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

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activites: Activity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activites.push(activity);
      });

      setActivities(activites);
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
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
