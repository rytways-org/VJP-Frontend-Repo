import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import api,{proxy} from "../../../../Api";
import {Link }from 'react-router-dom'

// This is the table constant/settings which needed to render table elements

export const ApprovalTable = (showFormHandler,actions) => {
  return [
    {
        title: 'Vendor Name',
        align:'left',
        render: rowData => {
          return (
          <>
          <span>{rowData.supplier.supplierName}</span></>
          )
        },
      },
   
    {
      title: 'Remarks',
      align:'left',
      render: rowData => {
        return <span>{rowData.remarks}</span>;
      
      },
    },  {
      title: 'Quotes Doc',
      align:'center',
      render: rowData => {
        return <FaIcons.FaDownload style={{cursor:"pointer"}} onClick={showFormHandler(rowData)}>
        </FaIcons.FaDownload>
    
      },
    },   
  ];
};


export default ApprovalTable