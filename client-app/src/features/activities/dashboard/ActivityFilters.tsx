import Calendar from "react-calendar"
import { Header, Menu } from "semantic-ui-react"

const ActivityFilters = () => {
  return (
    <>
      <Menu vertical color="teal" size="large" style={{ width: '100%', marginTop: 28 }} >
        <Header icon='filter' attached color="teal" content='Filters' />
        <Menu.Item content="All Activities" />
        <Menu.Item>I'm going</Menu.Item>
        <Menu.Item>I'm hosting</Menu.Item>
      </Menu>
      <Calendar />
    </>
  )
}

export default ActivityFilters