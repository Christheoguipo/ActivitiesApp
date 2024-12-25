import { Link } from "react-router-dom"
import { Button, Container, Header, Image, Segment } from "semantic-ui-react"

function HomePage() {
  return (
    <Segment inverted vertical textAlign="center" className="masthead">
      <Container text>
        <Header as={"h1"} inverted>
          <Image src={"/assets/logo.png"} alt="logo" size="massive" style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        <Header as={"h2"} inverted content="Welcome to Reactivities" />
        <Button as={Link} to={"/login"} inverted size="huge">Login</Button>
      </Container>
    </Segment>
  )
}

export default HomePage