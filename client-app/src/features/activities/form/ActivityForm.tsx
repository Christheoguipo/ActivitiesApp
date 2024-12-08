import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
    title: Yup.string().required("Title is required."),
    date: Yup.string().required("Date is required."),
    description: Yup.string().required("Description is required."),
    category: Yup.string().required("Category is required."),
    city: Yup.string().required("City is required."),
    venue: Yup.string().required("Venue is required.")
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {

    if (activity.id) {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }

  }

  if (isLoadingList) return (<LoadingComponent content="Loading activity..." />);

  return (
    <Segment clearing>
      <Header sub color="teal" content="Activity Details" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, dirty, isSubmitting }) => (
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
            <Header sub color="teal" content="Location Details" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              loading={isLoadingButton}
              type="submit" floated="right" positive content="Submit" />
            <Button as={Link} to="/activities" type="button" floated="right" content="Cancel"></Button>
          </Form>
        )}
      </Formik>

    </Segment>
  );
};

export default observer(ActivityForm);
