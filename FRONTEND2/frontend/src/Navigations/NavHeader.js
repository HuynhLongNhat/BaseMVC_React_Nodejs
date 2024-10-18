import React, { useContext, useState } from "react";
import "./NavHeader.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userProvider";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../asset/logo192.png";
import { logoutUser } from "../service/UserService"
import { toast } from "react-toastify";
function NavHeader(props) {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let data = await logoutUser();
    localStorage.removeItem('jwt')

    // ẩn thanh nav header
    logoutContext()
    if (data && +data.EC === 0) {
      toast.success("Logout success")
      navigate('/login')
    }
    else {
      toast.error(data.EM)
    }
  }
  if (user && user.isAuthenticated === true || location.pathname === '/') {
    return (
      <div>

        <div className="nav-header">
          <Navbar bg="header">
            <Container>
              <Navbar.Brand href="#" className="navbar-brand">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <span className="navbar-name">  React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">

                  <NavLink to="/" className="nav-link">Home</NavLink>
                  <NavLink to="/users" className="nav-link">Users</NavLink>
                  <NavLink to="/roles" className="nav-link">Roles</NavLink>
                  <NavLink to="/group-role" className="nav-link">Group-Roles</NavLink>
                  <NavLink to="/projects" className="nav-link">Projects</NavLink>
                  <NavLink to="/about" className="nav-link">About</NavLink>

                </Nav>

                <Nav>
                  {user && user.isAuthenticated === true ?

                    <>
                      <Nav.Item className="nav-link">Welcome {user.account.username}</Nav.Item>


                      <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <NavDropdown.Item >Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />

                        <NavDropdown.Item><span onClick={() => handleLogout()}>Logout</span></NavDropdown.Item>

                      </NavDropdown>
                    </>
                    :
                    <>
                      <Link to="/login" className="nav-link">Login</Link>
                    </>

                  }

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>


      </div>
    )
  }
  else {
    return (
      <></>
    )
  }
}

export default NavHeader;
