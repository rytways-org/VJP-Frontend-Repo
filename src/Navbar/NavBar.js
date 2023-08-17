import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaBars, FaUser } from 'react-icons/fa';
import { Navbar, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { moduleActions } from '../store/module-slice';
import AuthContext from '../store/auth-context';
import Logo from '../source/logo.png';
import { MenuItem } from '@mui/material';

import styled from 'styled-components';
import classes from './NavBar.module.css';
import { ui } from '../Api';

import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

import { NavDropdown } from 'react-bootstrap';


function NavBar(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const moduleId = useSelector((state) => state.sideBar.moduleId);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const setModuleId = () => {
    props.onHide();
    dispatch(
      moduleActions.selectModuleId({
        moduleId: '',
      })
    );
    history.push('/modules');
  };
  const handleLogout = () => {
    // Perform logout logic here if needed
    history.push('/'); // Redirect to the login page
  };
  return (
    <Navbar   fixed="top" className={`d-flex justify-content-center align-items-center ${classes.navbar}`}>
    <Container fluid style={{ width: '100vw' }}>
      
          {props.sidebar && isLoggedIn && moduleId > 0 && (
            <Navbar.Brand md="auto">
              <img src={Logo} className={classes.images} onClick={setModuleId} />
            </Navbar.Brand>
          )}
  
          {isLoggedIn && moduleId && (
            <Navbar.Brand>
              <FaBars
                style={{ color: 'rgba(0,0,21,.5)', fontSize: '1.6rem', cursor: 'pointer' }}
                onClick={props.OnIconClick}
              />
            </Navbar.Brand>
          )}
  
          
            <Navbar.Brand  className={classes.ltext} >Vee J Pee Aluminium Foundry</Navbar.Brand>
          
          {/* Move UserIcon here and wrap Dropdown inside it */}
          <Col className={classes.rightnav}>
          <p className={classes.uname}>User Name</p>
              <Dropdown style={{margin:'0 .9rem 0 3.5rem'}}>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  className="d-flex justify-content-center align-items-center"
                  bsPrefix="custom-toggle" // Add a custom prefix to the toggle element
                  toggleBsPrefix="toggle"  style={{height:'40px', width:'40px',borderRadius:'50%'}}
                >
                  <FaUser style={{ color: 'white', }} className={classes.uicon}/>
                </Dropdown.Toggle>
  
                <Dropdown.Menu style={{ right: '0', left: 'auto' }}>
                  <Dropdown.Item as={Link} to="/profile">
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} >
                    <i className="fa fa-sign-out"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            
            
          </Col>
        
      </Container>
    </Navbar>
  );
  }

export default NavBar;
