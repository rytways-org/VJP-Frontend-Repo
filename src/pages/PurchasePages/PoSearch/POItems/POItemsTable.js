import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements

export const POItemsTable = (handleEdit,actions,selectedColumns) => {
  
  return [
    {
      title: 'Item Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Unit Price',
      align:'center',
      render: rowData => {
        return <span>{rowData.unitprice}</span>;
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },{
      title: 'Gst Perc',
      align:'center',
      render: rowData => {
        return <span>{rowData.gstperc}</span>;
      },
    },{
      title: 'Gst',
      align:'center',
      render: rowData => {
        return <span>{rowData.gstAmount}</span>;
      },
    },
    {
      title: 'Amount',
      align:'center',
      render: rowData => {
        return <span>{rowData.amount}</span>;
      },
    },
    
    {
        title: 'Remove',
        align:'center',
        render: rowData => {
          return <FiTrash2 style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FiTrash2>
        },
      }
  ]
};

export default POItemsTable ;