import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const CustomerTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Entry Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.entryDate}</span>;
      
      },
    }, {
      title: 'Shift',
      align:'center',
      render: rowData => {
        return <span>{rowData.shift}</span>;
      },
    },
    {
      title: 'Inspected Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.insQuantity}</span>;
      },
    },{
      title: 'Accepted Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.insQuantity-rowData.rejectedQuantity-rowData.reworkQuantity}</span>;
      },
    },{
      title: 'Rejected Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.rejectedQuantity}</span>;
      },
    },
    {
      title: 'Rework Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.reworkQuantity}</span>;
      },
    },
  ];
};


export default CustomerTable