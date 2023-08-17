import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements

export const PurchaseItemsTable = (handleEdit,actions,selectedColumns) => {
  
  return [
    {
      title: 'Material Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.Lineno}</span>;
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.Quantity}</span>;
      },
    },
    {
      title: 'Expected Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.Date}</span>;
      },
    }, 
    {
      title: 'Remove',
      align:'center',
      render: rowData => {
        return <FiTrash2 style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FiTrash2>
      },
    },
  ]

};

export default PurchaseItemsTable ;