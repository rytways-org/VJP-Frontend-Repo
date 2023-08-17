import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const PurchaseRequestTable = (showFormHandler,actions) => {
  return [
 {
      title: `Item`,
      align:'center',
      render: rowData => {
         return <span>{rowData.material.materialName}</span>
      },
    },
    
    {
      title: 'Req No',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.requestNo}</span>;
      },
    }, {
      title: `Req Date`,
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.requestDate}</span>;
      },
    }, 
    {
      title: `PRType`,
      align:'c`enter',
      render: rowData => {
         return <span> {rowData.purchaseRequest.requestType}</span>
      },
    },{
      title: 'User Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.user.userName}</span>;
      
      },
    },
    {
      title: `Expected On`,
      align:'center',
      render: rowData => {
        return <span>{rowData.expectedDate}</span>;
      },
    }, 
   {
      title: `Aprd Qty`,
      align:'center',
      render: rowData => {
         return <span>{rowData.materialQty}</span>
      },
    }, {
      title: `PO Qty`,
      align:'center',
      render: rowData => {
         return <span>{rowData.poQty}</span>
      },
    },
    {
      title: 'Department',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.department}</span>;
      },
    },{
      title: 'Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.purchaseRequest.description}</span>;
      },
    }
  ];
};


export default PurchaseRequestTable