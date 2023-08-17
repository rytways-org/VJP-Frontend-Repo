import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements

export const RejectionTable = (handleEdit,actions,selectedColumns) => {
  
  return [
   
    {
      title: 'Reject Type',
      align:'center',
      render: rowData => {
        return <span>{rowData.defect.defectName}</span>;
      },
    },{
      title: 'Reject Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.rejectQty}</span>;
      },
    },{
      title: 'Reject Seriel No',
      align:'center',
      render: rowData => {
        return <span>{rowData.rejectedSerialNo}</span>;
      },
    },{
      title: 'Remove',
      align:'center',
      render: rowData => {
        return <FiTrash2 style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FiTrash2>
      },
    },
   
  ]
};

export default RejectionTable ;