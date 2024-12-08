import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { error } from "console";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const ActivityForm = () => {

  const { activityStore } = useStore();
  const { isLoadingButton, createActivity, updateActivity, loadActivity, isLoadingList } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: null,
    description: '',
    category: '',
    city: '',
    venue: ''
  });

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    date: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required()
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
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete='off' >
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <MySelectInput name="category" placeholder="Category" options={categoryOptions} />
            <MyDateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <Button loading={isLoadingButton} type="submit" floated="right" positive content="Submit" />
            <Button as={Link} to="/activities" type="button" floated="right" content="Cancel"></Button>
          </Form>
        )}
      </Formik>

    </Segment>
  );
};

export default observer(ActivityForm);
