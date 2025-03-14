import { Button, Grid, Header } from 'semantic-ui-react'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import { useEffect, useState } from 'react'
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface Props {
  isUploading: boolean;
  photoUpload: (file: Blob) => void;
}

const PhotoUploadWidget = ({ isUploading, photoUpload }: Props) => {

  const [files, setFiles] = useState<any>([]);

  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => photoUpload(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Upload Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize Image' />
        {files && files.length > 0 && (
          <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Preview & Upload' />
        {files && files.length > 0 && (
          <>
            <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
            <Button.Group widths={2}>
              <Button loading={isUploading} onClick={onCrop} positive icon='check' />
              <Button disabled={isUploading} onClick={() => setFiles([])} icon='close' />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default PhotoUploadWidget