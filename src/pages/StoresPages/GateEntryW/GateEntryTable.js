import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const StockInwardTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Grn Date',
      align:'left',
      render: rowData => {
        return <span>{rowData.date}</span>;
      
      },
    },
    {
      title: 'Grn Number',
      align:'left',
      render: rowData => {
        return <span>{rowData.internalPartNo}</span>;
      
      },
    }, {
      title: 'Po Number',
      align:'left',
      render: rowData => {
        return <span>{rowData.poPartNo}</span>;
      
      },
    },
    {
      title: 'Invoice No',
      align:'left',
      render: rowData => {
        return <span>{rowData.invoice}</span>;
      
      },
    },
   {
      title: 'Invoice Value',
      align:'right',
      render: rowData => {
        return (
        <>
        <span>{rowData.inValue}</span></>
        )
      },   
  }, {
    title: 'Vechicle No',
    align:'right',
    render: rowData => {
      return (
      <>
      <span>{rowData.vecNo}</span></>
      )
    },   
}, 	{
  title: 'Supplier Name',
  align:'right',
  render: rowData => {
    return (
    <>
    <span>{rowData.supName}</span></>
    )
  },   
},	{
  title: 'Expiry Date',
  align:'right',
  render: rowData => {
    return (
    <>
    <span>{rowData.expiryDate}</span></>
    )
  },   
},{
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
        },
      },
  ];
};


export default StockInwardTable