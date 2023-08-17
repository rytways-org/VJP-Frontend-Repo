import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';
import classes from './SideBar.modules.css'
import { useSelector } from 'react-redux';
import { costingMenu } from './SidebarModulewise/costing';
import { productionMenu } from './SidebarModulewise/production';
import { purchaseMenu } from './SidebarModulewise/purchase';
import { qualityMenu } from './SidebarModulewise/quality';
import { storeMenu } from './SidebarModulewise/store';
import {reportMenu} from './SidebarModulewise/reports'
import {Row,Col } from 'react-bootstrap';
import { Masters } from './SidebarModulewise/Masters';

const NavHeader = styled(Row)`
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  color: #1E90FF;
  text-decoration-thickness: 1200px;
  font-family: sans-serif;
  font-style: italic;
  font-size: 2em;
  font-weight: bold;
  margin-left: 10px;
  padding-top: 20px;
  
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
`;
/*      sidebar */
const SidebarNav = styled(Col)`
  background:  #1d2430;
  width: 17.6%;
  height: calc(100vh - 80px);
  display: block;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  border-radius : 0px;
  padding-right:0px;
  z-index: 999;
  overflow-y: auto;
`;

const SidebarWrap = styled(Row)`
  width: 100%;
  display:flex;
  position:absolute;
  
`;

function SideBar(props) {

  const moduleId = useSelector((state) => state.sideBar.moduleId);
  let SideBarData =[];
  if(moduleId===70){
    SideBarData= costingMenu;
  }else if(moduleId===10){
    SideBarData= productionMenu;
  }else if(moduleId===20){
    SideBarData= qualityMenu;
  }else if(moduleId===30){
    SideBarData= purchaseMenu;
  }else if(moduleId===40){
    SideBarData= storeMenu;
  }else if(moduleId===60){
    SideBarData= reportMenu;
  }else if(moduleId===50){
    SideBarData= Masters;
  }

   
  
  return (
    <SidebarNav sidebar={props.sidebar}>
      
    <SidebarWrap>
      {SideBarData.map((item, index) => {
        return <SubMenu item={item} key={index}/>;
      })}
    </SidebarWrap>
  </SidebarNav>
  )
}

export default SideBar