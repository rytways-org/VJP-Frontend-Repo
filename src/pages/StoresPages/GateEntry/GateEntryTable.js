import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const GateEntryTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Material Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.poItems.itemName}</span>;
      
      },
    },
    {
      title: 'PO No',
      align:'center',
      render: rowData => {
        return <span>{rowData.poItems.poNo}</span>;
      },
    },{
      title: 'Po Quantity',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.poItems.poQty}</span></>
        )
      },   
  },
  {
    title: 'Aceppted Qty',
    align:'center',
    render: rowData => {
      return (
      <>
      <span> {rowData.acceptedQty}</span></>
      )
    },
  },
    {
      title: 'Status',
      align:'center',
      render: rowData => {
        return (
          <>  <span>{rowData.grnStatus}</span>
           </>)
      },
    },
  ];
};


export default GateEntryTable