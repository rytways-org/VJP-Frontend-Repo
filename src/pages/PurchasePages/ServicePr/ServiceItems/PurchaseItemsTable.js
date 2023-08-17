import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements

export const PurchaseItemsTable = (handleEdit,actions,selectedColumns) => {
  
  return [
    {
      title: 'Service Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.specification}</span>;
      },
    },
    {
      title: 'Service Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.reqQty}</span>;
      },
    },
    {
      title: 'Service Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.expectedDate}</span>;
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