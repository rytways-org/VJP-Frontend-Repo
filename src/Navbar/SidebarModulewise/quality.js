import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fc";

export const qualityMenu = [
  {
    title: 'Home',
    path: '/modules',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Dashboard',
    path: '/quality/dashboard',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'Quality Entry',
    path: '/quality/entry',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'Entry Search',
    path: '/quality/entrySearch',
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
//       title: 'Process',
//       path: '/master/process',
//       icon: <FiIcons.FcProcess style={{ fontSize: '.9rem', margin: 'auto 0' }} />
//     },
//     {
//       title: 'Machines',
//       path: '/masters/machines',
//       icon: <FiIcons.FcProcess style={{ fontSize: '.9rem', margin: 'auto 0' }} />
//     }
//   ]
// }