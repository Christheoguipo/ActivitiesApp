import { useEffect, useState } from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    try {
      if (activity.id) {
        // Edit
        agent.Activities.update(activity).then(() => {

          setActivities([...activities.filter(a => a.id !== activity.id), activity]);

          setEditMode(false);
          setSubmitting(false);
          setSelectedActivity(activity);
        });

      } else {
        // Create
        activity.id = uuid();
        agent.Activities.create(activity).then(() => {
          setActivities([...activities, activity]);

          setEditMode(false);
          setSubmitting(false);
          setSelectedActivity(activity);
        });

      }
    } catch (error) {
      console.error(error);
      setEditMode(false);
      setSubmitting(false);
    }

  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    setEditMode(false);
    setSelectedActivity(undefined);

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      setSubmitting(false);
    });
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activites: Activity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activites.push(activity);
      });

      setActivities(activites);
      setLoading(false);
    });

  }, []);

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        {loading ? (
          <LoadingComponent content="Loading content" />
        ) : (
          < ActivityDashboard
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectedActivity={handleCancelSelectedActivity}
            activities={activities}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            editMode={editMode}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        )}
      </Container>
    </>
  );
}

export default observer(App);
