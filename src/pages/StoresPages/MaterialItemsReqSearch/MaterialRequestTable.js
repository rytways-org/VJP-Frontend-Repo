import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ProductTable = (showFormHandler,actions) => {
  return [
 {
      title: `Requested Item`,
      align:'center',
      render: rowData => {
         return <span>{rowData.Item}</span>
      },
    },
    
    {
      title: 'Request No',
      align:'center',
      render: rowData => {
        return <span>{rowData.internalPartNo}</span>;
      },
    }, {
      title: `Request Date`,
      align:'center',
      render: rowData => {
        return <span>{rowData.date}</span>;
      },
    }, 
    {
      title: 'User Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    
   {
      title: `Approved Qty`,
      align:'center',
      render: rowData => {
         return <span>{rowData.Qty}</span>
      },
    },
    {
      title: 'Department',
      align:'center',
      render: rowData => {
        return <span>{rowData.dims}</span>;
      },
    },{
      title: 'Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.description}</span>;
      },
    }
  ];
};


export default ProductTable