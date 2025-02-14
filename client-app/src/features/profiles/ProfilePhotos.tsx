import { observer } from 'mobx-react-lite'
import { Button, Card, Grid, Header, Image, TabPane } from 'semantic-ui-react'
import { IPhoto, Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import { SyntheticEvent, useState } from 'react'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'

interface Props {
  profile: Profile
}

const ProfilePhotos = ({ profile }: Props) => {

  const { profileStore: { isCurrentUser, uploadPhoto, isUploading, isSettingMainPhoto, setMainPhoto, isDeleting, deletePhoto } } = useStore();
  const [isAddPhotoMode, setIsAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setIsAddPhotoMode(false));
  }

  const handleSetTarget = (photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  const handleDeletePhoto = (photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
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
                  {isCurrentUser && (
                    <Button.Group widths={2} fluid>
                      <Button basic color='green' content='Main'
                        disabled={photo.isMain}
                        name={photo.id}
                        loading={isSettingMainPhoto && target === photo.id}
                        onClick={(e) => handleSetTarget(photo, e)}
                      />
                      <Button basic color='red' icon='trash'
                        disabled={photo.isMain}
                        name={photo.id}
                        loading={isDeleting && target === photo.id}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                      />
                    </Button.Group>
                  )}
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