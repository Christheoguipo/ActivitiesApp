import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react"
import { Profile } from '../../app/models/profile'
import { observer } from 'mobx-react-lite'

interface Props {
  profile: Profile
}

const ProfileHeader = ({ profile }: Props) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Header as={'h1'} content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4} >
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group>
          <Divider />
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
              <Button fluid color='teal' content='Following' />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: '100%' }}>
              <Button fluid basic color='red' content='Unfollow' />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default observer(ProfileHeader)