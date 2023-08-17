import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const StockInwardTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Inward Date',
      align:'left',
      render: rowData => {
        return <span>{rowData.date}</span>;
      
      },
    },
    {
      title: 'Material Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    }, 
   {
      title: 'Inward Quantity',
      align:'right',
      render: rowData => {
        return (
        <>
        <span>{rowData.RQty}</span></>
        )
      },   
  },{
    title: 'Uom',
    align:'left',
    render: rowData => {
      return <span>{rowData.shotWeight}</span>;
    
    },
  },{
    title: 'Damage Type',
    align:'left',
    render: rowData => {
      return <span>{rowData.uom}</span>;
    
    },
  },{
    title: 'Reason For Damage',
    align:'left',
    render: rowData => {
      return <span>{rowData.description}</span>;
    
    },
  },{
    title: 'Approval Remarks',
    align:'left',
    render: rowData => {
      return <span>{rowData.description1}</span>;
    
    },
  },{
    title: 'Status',
    align:'center',
    render: rowData => {
      return (
        <> {["Received"].includes(`${rowData.status}`) ? <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,"approvalForm")}>{rowData.status}</span> : <span>{rowData.status}</span>}
         </>)
    },
  },
      {
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
        },
      },
  ];
};


export default StockInwardTable