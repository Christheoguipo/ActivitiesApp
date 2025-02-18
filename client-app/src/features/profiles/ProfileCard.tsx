import { observer } from "mobx-react-lite"
import { Profile } from "../../app/models/profile";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Props {
  profile: Profile;
}

const ProfileCard = ({ profile }: Props) => {

  const truncateLongBio = (bio: string | undefined) => {
    if (bio && bio.length > 44)
      return bio.substring(0, 41) + '...';
    return bio;
  }

  return (
    <Card as={Link} to={`profiles/${profile.username}`} >
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncateLongBio(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        no. of Followers placeholder
      </Card.Content>
    </Card>
  )
}

export default observer(ProfileCard)