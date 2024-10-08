import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean
}

const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) => {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    if (event.target.value === null) {
      event.target.value = '';
    }

    const { name, value } = event.target;

    setActivity({ ...activity, [name]: value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off' >
        <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChange} />
        <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange} />
        <Button loading={submitting} type="submit" floated="right" positive content="Submit" />
        <Button onClick={closeForm} type="button" floated="right" content="Cancel"></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
