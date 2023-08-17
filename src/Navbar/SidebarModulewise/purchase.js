import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fc";

export const purchaseMenu = [
  {
    title: 'Home',
    path: '/modules',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'PR Template',
    path: '/purchase/prtemplate',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  }, 
  // {
  //   title: 'Dashboard',
  //   path: '/purchase/dashboard',
  //   icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  // },
  {
    title: 'Material PR',
    path: '/purchase/materialpr',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Service PR',
    path: '/purchase/servicepr',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  
  {
    title: 'Material PO',
    path: '/purchase/poentry',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'Service PO',
    path: '/purchase/ServicePoEntry',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Job Order PO',
    path: '/purchase/poentry',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'Job  Order Request',
    path: '/purchase/jorder',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'Capex PR',
    path: '/purchase/capexpr',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'PR Items Search',
    path: '/purchase/prsearch',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },  
  
  {
    title: 'PO Search',
    path: '/purchase/posearch',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },  
];


// {
//   title: 'Master',
//   path: '#',
//   icon: <AiIcons.AiFillHome style={{ fontSize: '.9rem', margin: 'auto 0' }} />,
//   iconClosed: <RiIcons.RiArrowDownSFill style={{ fontSize: '.9rem', margin: 'auto 0' }} />,
//   iconOpened: <RiIcons.RiArrowUpSFill style={{ fontSize: '.9rem', margin: 'auto 0' }} />,

//   subNav: [
//     {
//       title: 'Product Master',
//       path: '/Master/Products',
//       icon: <IoIcons.IoIosPaper style={{ fontSize: '.9rem', margin: 'auto 0' }} />
//     },
//     {
//       title: 'Machines',
//       path: '/masters/machines',
//       icon: <FiIcons.FcProcess style={{ fontSize: '.9rem', margin: 'auto 0' }} />
//     }
//   ]
// }
