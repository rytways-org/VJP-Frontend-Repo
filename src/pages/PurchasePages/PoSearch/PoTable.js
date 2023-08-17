import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const OrderTable = (showFormHandler,actions) => {
  return [
    {
      title: 'PO Date',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.poDate}</span></>
        )
      },
    },
    {
      title: 'PO Number',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.poNo}</span></>
        )
      },
    },{
      title: 'Company Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.company.companyName}</span>;
      },
    },
    {
      title: 'Supplier Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.supplier.supplierName}</span>;
      },
    },
    {
      title: 'Net Amt',
      align:'left',
      render: rowData => {
        return <span>{rowData.netAmt}</span>;
      },
    },{
      title: 'Status',
      align:'left',
      render: rowData => {
        return (
        <>{["Awaiting_Approval"].includes(`${rowData.status}`) ? 
        <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[2])}>{rowData.status}</span> :
        <span style={{color:"gray"}} >{rowData.status}</span>
        }</>
         )},
    },
    {
      title: 'Edit',
      align:'center',
      render: rowData => {
        return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
      },
    },
    {
      title: 'P.O',
      align:'center',
      render: rowData => {
        return <FaIcons.FaEye style={{cursor:"pointer"}} onClick={showFormHandler(rowData,"viewPo")}></FaIcons.FaEye>
      },
    },{
      title: 'Docs',
      align:'center',
      render: rowData => {
        return <FaIcons.FaEye style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[3])}></FaIcons.FaEye>
      },
    },{
      title: 'GRN',
      align:'center',
      render: rowData => {
        return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={rowData.poType != "Service_Purchase_Order" ? showFormHandler(rowData,actions[1],"PO") :  showFormHandler(rowData,actions[1],"SERVICE")}></FaIcons.FaEdit>
      },
    }
    
  ];
};


export default OrderTable