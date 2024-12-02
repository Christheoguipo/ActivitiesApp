import { Container, Header, Segment } from "semantic-ui-react";
import { store } from "../../app/stores/store";

const ServerError = () => {
  const { commonStore } = store;
  return (
    <Container>
      <Header as='h1' content="Server error" />
      <Header as='h2' sub color="red" content={commonStore.error?.message} />
      {commonStore.error?.details &&
        (<Segment>
          <Header as={'h4'} color="teal" content="Stack trace" />
          <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
        </Segment>
        )}
    </Container>
  );
}

export default ServerError;