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
  }, {
    title: 'Purchase Price',
    align:'right',
    render: rowData => {
      return (
      <>
      <span>{rowData.Qty}</span></>
      )
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