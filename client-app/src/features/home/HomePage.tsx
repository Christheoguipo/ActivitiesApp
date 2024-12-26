import { Link } from "react-router-dom"
import { Button, Container, Header, Image, Segment } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { observer } from "mobx-react-lite";

function HomePage() {

  const { userStore: { isUserLoggedIn } } = useStore();

  return (
    <Segment inverted vertical textAlign="center" className="masthead">
      <Container text>
        <Header as={"h1"} inverted>
          <Image src={"/assets/logo.png"} alt="logo" size="massive" style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        {isUserLoggedIn ?
          <>
            <Header as={"h2"} inverted content="Welcome to Reactivities" />
            <Button as={Link} to={"/activities"} inverted size="huge">Go to Activities!</Button>
          </>
          : <Button as={Link} to={"/login"} inverted size="huge">Login!</Button>}
      </Container>
    </Segment>
  )
}

export default observer(HomePage)