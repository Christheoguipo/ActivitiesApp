import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
}


const ActivityForm = ({ activity, closeForm }: Props) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title"></Form.Input>
        <Form.TextArea placeholder="Description"></Form.TextArea>
        <Form.Input placeholder="Category"></Form.Input>
        <Form.Input placeholder="Date"></Form.Input>
        <Form.Input placeholder="City"></Form.Input>
        <Form.Input placeholder="Venue"></Form.Input>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button onClick={closeForm} type="button" floated="right" content="Cancel"></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
