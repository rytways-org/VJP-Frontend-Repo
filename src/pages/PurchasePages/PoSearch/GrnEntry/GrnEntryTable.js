import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const GrnEntryTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Rcvd Date',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.receivedDate}</span></>
        )
      },
    },
    {
        title: 'Material Name',
        align:'center',
        render: rowData => {
          return (
          <>
          <span>{rowData.poItems.itemName}</span></>
          )
        },   
    },{
      title: 'PO Qty',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.poItems.poQty}</span></>
        )
      },   
  },
    {
        title: 'Rcvd Qty',
        align:'center',
        render: rowData => {
          return (
          <>
          <span>{rowData.receivedTillDate}</span></>
          )
        },   
    },{
      title: 'Acpt Qty',
      align:'center',
      render: rowData => {
        return (
        <>
        <span>{rowData.acceptedTillDate}</span></>
        )
      },   
  },
   
    {
        title: 'In Qty',
        align:'center',
        render: rowData => {
          return (
          <>
          <span>{rowData.receivedQty}</span></>
          )
        },
      },{
        title: 'Acpt Qty',
        align:'center',
        render: rowData => {
          return (
          <>
          <span> {<span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,"acceptedEdit")}>{rowData.acceptedQty}</span>}</span></>
          )
        },
      },
      {
        title: 'Bal Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.poItems.poQty-rowData.acceptedTillDate}</span>;
        
        },
      }   
  ];
};


export default GrnEntryTable