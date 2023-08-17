import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements
export const RmTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Raw Material',
      align:'left',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Unit Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.unitQty}</span>;
      },
    },
    {
      title: 'Balance Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.tQty}</span>;
      },
    }, {
        title: 'Current Stock',
        align:'center',
        render: rowData => {
          return <span>{rowData.availQty}</span>;
        },
      },
    {
      title: 'Ordered Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.uQty}</span>;
      },
    },
  ];
};


export default RmTable