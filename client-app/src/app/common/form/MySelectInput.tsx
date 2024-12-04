import { useField } from "formik"
import { FormField, Label, Select } from "semantic-ui-react"

interface Props {
  name: string;
  placeholder: string;
  options: { text: string, value: string }[],
  label?: string;
}

const MySelectInput = ({ name, placeholder, options, label }: Props) => {

  const [field, meta, helpers] = useField(name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        options={options}
        name={name}
        value={field.value || null}
        onChange={(_, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
      />
      {meta.touched && meta.error
        ? <Label basic color="red" pointing content={meta.error} /> : null}
    </FormField>
  )
}

export default MySelectInput