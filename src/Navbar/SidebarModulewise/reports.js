import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from "react-icons/fc";
import * as HiIcons from "react-icons/hi";


export const reportMenu = [
  {
    title: 'Home',
    path: '/modules',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Sales',
    path: '/reports/sales',
    icon: <FaIcons.FaProductHunt style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Ageing Reports',
    path: '/reports/ageing',
    icon: <HiIcons.HiOutlineSearchCircle style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  },
  {
    title: 'Finance Reports',
    path: '/reports/finance',
    icon: <HiIcons.HiOutlineSearchCircle style={{ fontSize: '.9rem', margin: 'auto 0' }} />
  }
];