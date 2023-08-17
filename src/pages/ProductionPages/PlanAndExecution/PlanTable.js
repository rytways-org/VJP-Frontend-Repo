import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const PlanTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Plan Date',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.planDate}</span></>
        )
      },
    },{
      title: 'Shift',
      align:'center',
      render: rowData => {
        return <span>{rowData.shift}</span>;
      
      },
    },{
      title: 'Customer Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.order.product.customer.name}</span>;
      },
    },{
      title: 'Product',
      align:'left',
      render: rowData => {
        return <span>{rowData.order.product.productName}</span>;
      },
    },
    {
      title: 'Process',
      align:'center',
      render: rowData => {
        return <span>{rowData.productProcessMap.process.processName}</span>;
      },
    },
    {
      title: 'Planed Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.planQty}</span>;
      },
    },{
      title: 'Produced Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.producedQty}</span>;
      },
    },{
      title: 'Plan Remarks',
      align:'left',
      render: rowData => {
        return <span>{rowData.remarksForProd}</span>;
      },
    },{
      title: 'Production Remarks',
      align:'left',
      render: rowData => {
        return <span>{rowData.remarksAfterProd}</span>;
      },
    },
    
  ];
};


export default PlanTable