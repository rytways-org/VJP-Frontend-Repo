import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fc";

export const costingMenu = [
  {
    title: 'Home',
    path: '/modules',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Dashboard',
    path: '/costing/dashboard',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'New Products',
    path: '/costing/newproducts',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Input Sheet Entry',
    path: '/costing/process',
    icon: <AiIcons.AiFillHome style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Input Sheet Search',
    path: '/costing/inputsheetsearch',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  }, 
  {
    title: 'Working',
    path: '/costing/working',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  }
];