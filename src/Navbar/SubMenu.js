import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Row } from 'react-bootstrap';
import { ui } from '../Api';

const hoverAnimation = keyframes`
  0% {
    background-color: #99aae4;
  }
  50% {
    background-color: #99aae4;
  }
  100% {
    background-color: #4662c9;
  }
`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  height: 48px;
  text-decoration: none;
  background-color: transparent;
  transition: background-color 0s ease;

  ${({ isHovered }) =>
    isHovered &&
    css`
      animation: ${hoverAnimation} .2s;
      background-color: #4662c9;
      color: white;
      font-size: 875rem;
      
      
    `}
    &:hover {
      color: #ffffff;
      
      cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
  margin-left: 28px;
  font-weight: 400;
  font-size: 1rem;
`;

const DropdownLink = styled(Link)`
  background: #2f3651;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 1.1rem;
  width: 100%;
  &:hover {
    background: #a3b2f1;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  margin-right: 0px;
  border-right: 0px;
  display: flex;
  padding-left: 4px;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isHovered={isHovered}
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <LinkContainer>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </LinkContainer>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
