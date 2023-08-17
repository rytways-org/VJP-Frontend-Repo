import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fc";

export const storeMenu = [
  {
    title: 'Home',
    path: '/modules',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Dashboard',
    path: '/stores',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },{
    title: 'GRN Inward',
    path: '/stores/grnitems',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  } ,  {
    title: 'Stock Inward',
    path: '/stores/inward',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  }, {
    title: 'Material Request',
    path: '/stores/materialreq1',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },,{
    title: 'Damaged Goods',
    path: '/stores/damagegoods',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  }, {
    title: 'Gate Entry',
    path: '/stores/grnentry',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  } 
];

// {
//   title: 'Material Search',
//   path: '/stores/materialsearch',
//   icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
// },

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