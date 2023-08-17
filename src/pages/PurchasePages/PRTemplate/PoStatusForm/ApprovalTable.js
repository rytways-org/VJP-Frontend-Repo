import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ApprovalTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Material  Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.internalPartNo}</span>;
      
      },
    },
    {
      title: 'Request Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.qty}</span>;
      },
    },
    {
      title: `Expected Date`,
      align:'center',
      render: rowData => {
        return <span>{rowData.date}</span>;
         
      },
    },{
      title: 'Revise Qty',
      align:'center',
      render: rowData => {
        return (
          <> {<span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,"acceptedEdit")}>{rowData.qty}</span>}
           </>)
      },
    },
      
  ];
};


export default ApprovalTable