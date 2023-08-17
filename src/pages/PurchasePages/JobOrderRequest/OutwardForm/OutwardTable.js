import React from 'react';
import * as BsIcons from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements
export const OutwardTable = (handleEdit,exportTill) => {
  return [
    {
        title: 'Date',
        align:'center',
        render: rowData => {
          return <span>{rowData.entryDate}</span>;
        
        },
      },{
        title: 'Dc No',
        align:'center',
        render: rowData => {
          return <span>{rowData.dcNo}</span>;
        
        },
      },{
        title: 'Vechicle Details',
        align:'center',
        render: rowData => {
          return <span>{rowData.vechicleDetails}</span>;
        
        },
      },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },
    {
        title: 'Remarks',
        align:'left',
        render: rowData => {
          return <span>{rowData.remarks}</span>;
        },
      },
      {
      title: 'Edit',
      align:'center',
      render: rowData => {
        return <FiEdit style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FiEdit>
      },
    }
  ]
};