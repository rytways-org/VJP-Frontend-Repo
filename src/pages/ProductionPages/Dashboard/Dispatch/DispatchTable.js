import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const DispatchTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Dispatch Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.date}</span>;
      
      },
    },
    {
      title: 'Dispatch Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.tQty}</span>;
      },
    },
  ];
};


export default DispatchTable