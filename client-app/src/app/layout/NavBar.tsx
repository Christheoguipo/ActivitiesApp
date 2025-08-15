import { observer } from "mobx-react-lite";
import { Button, Container, Dropdown, Image, Menu, Progress } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";

const NavBar = () => {

  const { userStore: { user, logout }, activityStore: { isLoadingList } } = useStore();
 
  return (
    <div>
      <Menu className="navbar-menu" compact inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to='/' header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
            Reactivities
          </Menu.Item>
          <Menu.Item as={NavLink} to='/activities' name="Activities" />
          {/* <Menu.Item as={NavLink} to='/errors' name="Errors" /> */}
          <Menu.Item>
            <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
          </Menu.Item>
          <Menu.Item position="right">
            <Image src={user?.image || '/assets/user.png'} avatar spaced="right" />
            <Dropdown pointing="top left" text={user?.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text="My Profile" icon="user" />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

        </Container>

      </Menu>

      <div className="menu-progress">
        {isLoadingList &&
          <Progress
            percent={100}
            active={isLoadingList}
            size="tiny"
            inverted
            attached="bottom"
          />}
      </div>
    </div>
  );
};

export default observer(NavBar);
