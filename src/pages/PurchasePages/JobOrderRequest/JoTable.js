import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {TbLayoutSidebarLeftExpand} from 'react-icons/tb'
import {GiEntryDoor} from 'react-icons/gi'
import {BsFillPatchCheckFill} from 'react-icons/bs'
// This is the table constant/settings which needed to render table elements

export const JoTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Product Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Customer Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.cusName}</span>;
      },
    },
    {
      title: 'Vendor Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.vName}</span>;
      },
    },
    {
      title: 'Req Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },{
      title: 'Approved Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.rQty}</span>;
      },
    },
    {
        title: 'Status',
        align:'left',
        render: rowData => {
          return (
         <> {["Approved","Awaiting_Approval"].includes(`${rowData.status}`) ? <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[0])}>{rowData.status}</span> : <span>{rowData.status}</span>}
          </>)
    },
      },
      
      
      
      
      
  ];
};


export default JoTable