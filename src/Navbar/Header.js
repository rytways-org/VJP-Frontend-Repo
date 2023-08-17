import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarModulewise/SidebarData";
import SubMenu from "./SubMenu";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { IconContext } from "react-icons/lib";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom';


const NavWrap = styled(Col)`
  display: flex;
  align-items: center;
  align-contents: center;
  margin-right: 1%;
  border-radius: 5px;
  margin-left: ${({ sidebar }) => (!sidebar ? "1%" : "16.5%")};
  margin-top: 80px;
  height: max-content;
  padding: 0em 0em 0em 0em;
  overflow-x: scroll;
  
 
`;
/*    top: 100px; */
const ContainerHeaderWrap = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
`;

const Navcl = styled(Row)`
display: flex;
justify-content: center;
align-items: center;
`;




const Header = (props) => {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [navimg, setnavimg] = useState(false);
  const moduleId = useSelector((state) => state.sideBar.moduleId);
  const showSidebar = () => setSidebar(!sidebar);
  const hideSidebar = () => setSidebar(false);
  const shownavimg = () => setnavimg(!navimg);
  const hidenavimg = () => setnavimg(false);


  useEffect(() => {
    if (moduleId == "") {
      hideSidebar();
    }
  }, [moduleId]);
  
  useEffect(() => {
    if (moduleId == "") {
      hidenavimg();
    }
  }, [moduleId]);


  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
       
        <NavBar
          OnIconClick={showSidebar}
          onHide={hideSidebar}
          sidebar={sidebar}
          Onshow={shownavimg}
          className="right"
        >
          {" "}
        </NavBar>
        
        <ContainerHeaderWrap>
          {isLoggedIn && moduleId > 0 && (
            <SideBar sidebar={sidebar} Onshow={showSidebar}></SideBar>
          )}
          <NavWrap sidebar={sidebar}  onClick={hideSidebar}>
          {props.children}</NavWrap>
        </ContainerHeaderWrap>
      </IconContext.Provider>
    </>
  );
};

export default Header;
