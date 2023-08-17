import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'


// This is the table constant/settings which needed to render table elements


export const DispatchTable = (showFormHandler) => {
  return [
    {
      title: 'Dispatch Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.invoiceDate}</span>;
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      
      },
    },{
      title: 'Invoice Details',
      align:'center',
      render: rowData => {
        return <span>{rowData.invoiceNo}</span>;
      },
    },
    {
      title: 'Vechile Details',
      align:'center',
      render: rowData => {
        return <span>{rowData.vehicleDetails}</span>;
      },
    },{
        title: 'Remarks',
        align:'center',
        render: rowData => {
          return <span>{rowData.remarks}</span>;
        },
      },{
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FiEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,"edit")}></FiEdit>
        },
      }
   
  ];
};


export default DispatchTable