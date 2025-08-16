import { observer } from "mobx-react-lite"
import { Grid, Header, Tab, TabPane, TabProps } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import ActivityContent from "./ActivityContent";


const panes = [
    { menuItem: "Future Events", render: () => <ActivityContent />, key: "future" },
    { menuItem: "Past Events", render: () => <ActivityContent />, key: "past" },
    { menuItem: "Hosting", render: () => <ActivityContent />, key: "hosting" },
];

const ProfileActivities = () => {
    const { profileStore: { profile, loadActivities } } = useStore();

    const handleLoadActivities = (predicate: string) => {
        if (profile)
            loadActivities(profile.username, predicate);
    }

    const handleTabChange = (data: TabProps) => {
        const predicate = panes[data.activeIndex as number].key;
        handleLoadActivities(predicate);
    };

    useEffect(() => {
        handleLoadActivities("future");
    }, []);

    return (
        <TabPane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" content="Events" icon={'calendar'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab panes={panes} onTabChange={(_, data) => {
                        handleTabChange(data);
                    }} />
                </Grid.Column>
            </Grid>
        </TabPane>
    );
}

export default observer(ProfileActivities);