import { Link } from "react-router-dom"
import { Button, Container, Header, Image, Segment } from "semantic-ui-react"
import { useStore } from "../../app/stores/store"
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

function HomePage() {

  const { userStore: { isUserLoggedIn }, modalStore } = useStore();

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
          :
          <>
            <h2>Login to Reactivities!</h2>
            <Button onClick={() => modalStore.openModal(<LoginForm />)} inverted size="huge">Login</Button>
            <Button onClick={() => modalStore.openModal(<RegisterForm />)} inverted size="huge">Register</Button>
          </>
        }
      </Container>
    </Segment>
  )
}

export default observer(HomePage)