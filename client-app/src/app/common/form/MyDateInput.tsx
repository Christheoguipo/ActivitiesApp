import { useField } from "formik"
import { FormField, Label } from "semantic-ui-react"
import DatePicker from "react-datepicker";

interface Props {
  name: string;
  placeholderText: string;
  showTimeSelect: boolean;
  timeCaption: string;
  dateFormat: string;
}

const MyDateInput = (props: Props) => {

  const [field, meta, helpers] = useField(props.name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value) || null)}
        onChange={value => helpers.setValue(value)}
      />
      {meta.touched && meta.error
        ? <Label basic color="red" pointing content={meta.error} /> : null}
    </FormField>
  )
}

export default MyDateInput