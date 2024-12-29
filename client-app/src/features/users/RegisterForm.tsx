import { ErrorMessage, Form, Formik } from "formik"
import MyTextInput from "../../app/common/form/MyTextInput"
import { Button, Header } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { observer } from "mobx-react-lite"
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError"

const RegisterForm = () => {

  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '', username: '', error: null }}
      onSubmit={(values, { setErrors }) => userStore.register(values).catch((error) => setErrors({ error }))}
      validationSchema={Yup.object({
        email: Yup.string().required("Email is required."),
        password: Yup.string().required("Password is required."),
        displayName: Yup.string().required("Display Name is required."),
        username: Yup.string().required("Username is required."),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off" >
          <Header as='h2' content="Sign up to Reactivities" color="teal" textAlign="center" />
          <MyTextInput name="displayName" placeholder="Display Name" label="Display Name" />
          <MyTextInput name="username" placeholder="Username" label="Username" />
          <MyTextInput name="email" placeholder="Email" label="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" label="Password" />
          <ErrorMessage name="error" render={() =>
            <ValidationError errors={errors.error as unknown as string[]} />}
          />
          <Button disabled={!dirty || !isValid || isSubmitting} loading={isSubmitting} positive content="Register" type="submit" fluid />
        </Form>)}
    </Formik >
  )
}

export default observer(RegisterForm)