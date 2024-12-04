import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';
import { Formik } from "formik";

const ActivityForm = () => {

  const { activityStore } = useStore();
  const { isLoadingButton, createActivity, updateActivity, loadActivity, isLoadingList } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  // const handleSubmit = () => {

  //   if (activity.id) {
  //     updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  //   } else {
  //     activity.id = uuid();
  //     createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
  //   }

  // }

  // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

  //   if (event.target.value === null) {
  //     event.target.value = '';
  //   }

  //   const { name, value } = event.target;

  //   setActivity({ ...activity, [name]: value })
  // }

  if (isLoadingList) return (<LoadingComponent content="Loading activity..." />);

  return (
    <Segment clearing>
      <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} autoComplete='off' >
            <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleChange} />
            <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleChange} />
            <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleChange} />
            <Form.Input type="date" placeholder="Date" value={activity.date} name='date' onChange={handleChange} />
            <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleChange} />
            <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleChange} />
            <Button loading={isLoadingButton} type="submit" floated="right" positive content="Submit" />
            <Button as={Link} to='/activities' type="button" floated="right" content="Cancel"></Button>
          </Form>
        )}
      </Formik>

    </Segment>
  );
};

export default observer(ActivityForm);
