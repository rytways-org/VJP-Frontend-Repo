import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fc";
import * as HiIcons from "react-icons/hi";


export const productionMenu = [
  {
    title: 'Home',
    path: '/modules',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Dashboard',
    path: '/production/dashboard',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Order Search',
    path: '/production/ordersearch',
    icon: <HiIcons.HiOutlineSearchCircle style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Jo Search',
    path: '/production/josearch',
    icon: <HiIcons.HiOutlineSearchCircle style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Planing-Production',
    path: '/production/plan',
    icon: <AiIcons.AiOutlineSchedule style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Melting Entry',
    path: '/production/melting',
    icon: <AiIcons.AiOutlineSchedule style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  } ,
  {
    title: 'Stores Request',
    path: '/production/storesRequest',
    icon: <AiIcons.AiOutlineSchedule style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  } 
];

// {
//   title: 'Production Entry',
//   path: '/production/entry',
//   icon: <AiIcons.AiOutlineSchedule style={{ fontSize: '.9rem', margin: 'auto 0' }} />
// }