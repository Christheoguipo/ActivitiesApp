import { useField } from "formik"
import { FormField, Label } from "semantic-ui-react"

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
}

const MyTextInput = (props: Props) => {

  const [field, meta] = useField(props.name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error
        ? <Label basic color="red" pointing content={meta.error} /> : null}
    </FormField>
  )
}

export default MyTextInput