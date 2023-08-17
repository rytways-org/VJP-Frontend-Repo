import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const CustomerTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Customer Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.name}</span>;
      
      },
    }, {
      title: 'Contact No',
      align:'center',
      render: rowData => {
        return <span>{rowData.contactNo}</span>;
      },
    }, {
      title: 'Customer Email',
      align:'center',
      render: rowData => {
        return <span>{rowData.contactEmail}</span>;
      },
    },
    {
      title: 'Customer Category',
      align:'center',
      render: rowData => {
        return <span>{rowData.category}</span>;
      },
    },{
      title: 'Customer Segment',
      align:'center',
      render: rowData => {
        return <span>{rowData.segment}</span>;
      },
    },
      {
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[1])}></FaIcons.FaEdit>
        },
      }
  ];
};


export default CustomerTable