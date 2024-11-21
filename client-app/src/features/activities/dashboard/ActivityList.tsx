import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react/jsx-runtime";

const ActivityList = () => {

  const { activityStore } = useStore();
  const { groupedActivityByDate } = activityStore;

  return (
    <>
      {groupedActivityByDate.map(([dateAsKey, activities]) => (

        <Fragment key={dateAsKey}>
          <Header sub color="teal" >
            {dateAsKey}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
