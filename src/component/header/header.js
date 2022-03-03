import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./header.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Stack } from "@mui/material";
import moment from "moment";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const profile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  const now = new Date();
  const date = moment(now).format("MMMM Do YYYY, h:mm:ss a");
  const logOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    // navigate("/");
    window.location.href = "/";
  };
  const user = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  return (
    <div className="header">
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="navTab"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} alt="mn" style={{ height: "48px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#deets" style={{ color: "black" }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="buttons"
                >
                  Last Login: <span>{date}</span>
                </Button>
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#memes"
                className="d-flex"
                style={{ color: "black" }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  style={{ marginRight: "8px" }}
                >
                  <Avatar>H</Avatar>
                </Stack>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="buttons"
                >
                  Welcome to {user} <KeyboardArrowDownIcon />
                </Button>
              </Nav.Link>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={profile}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <div className="bottom">
        <Container>
          <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className="navs"
          >
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                <HomeIcon />
                <span>Home</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <PersonIcon />
                <span>Profile</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <HelpIcon /> <span>Help</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  navigate("/quickpay");
                }}
              >
                <CurrencyRupeeIcon /> <span>Quick Pay</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>
    </div>
  );
}

export default Header;
