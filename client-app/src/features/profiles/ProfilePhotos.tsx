import { observer } from 'mobx-react-lite'
import { Button, Card, Grid, Header, Image, TabPane } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import { useState } from 'react'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'

interface Props {
  profile: Profile
}

const ProfilePhotos = ({ profile }: Props) => {

  const { profileStore: { isCurrentUser, uploadPhoto, isUploading } } = useStore();
  const [isAddPhotoMode, setIsAddPhotoMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setIsAddPhotoMode(false));
  }

  return (
    <TabPane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon={'image'} content='Photos' />
          {isCurrentUser &&
            <Button
              floated='right'
              basic
              content={isAddPhotoMode ? 'Cancel' : 'Add photo'}
              onClick={() => setIsAddPhotoMode(!isAddPhotoMode)}
            />}
        </Grid.Column>
        <Grid.Column width={16}>
          {isAddPhotoMode ? (
            <PhotoUploadWidget photoUpload={handlePhotoUpload} isUploading={isUploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) =>
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              )}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </TabPane>
  )
}

export default observer(ProfilePhotos)