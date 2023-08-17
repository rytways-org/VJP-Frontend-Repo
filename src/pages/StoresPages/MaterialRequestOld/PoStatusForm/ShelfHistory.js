import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ApprovalTable = (showFormHandler,actions) => {
  return [
    {
        title: `Inward Date`,
        align:'center',
        render: rowData => {
          return <span>{rowData.inDate}</span>;
           
        },
      },{
      title: 'Material Name',
      align:'center',
      render: rowData => {
        return  (
          <span> Mat1
           </span>)
      
      },
    },
    {
      title: 'Qty Avail',
      align:'center',
      render: rowData => {
        return <span>{rowData.qty}</span>;
      },
    },
    {
      title: `Expiry Date`,
      align:'center',
      render: rowData => {
        return <span>{rowData.expiry}</span>;
         
      },
    },{
      title: 'Days Remaining',
      align:'center',
      render: rowData => {
        return (
          <> 
         <span>{rowData.days}</span> 
           </>)
      },
    }
      
  ];
};


export default ApprovalTable