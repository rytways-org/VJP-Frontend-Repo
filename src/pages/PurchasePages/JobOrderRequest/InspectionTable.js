import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'


// This is the table constant/settings which needed to render table elements


export const InspectionTable = (showFormHandler) => {
  return [
    {
        title: 'Entry Date',
        align:'Center',
        render: rowData => {
          return <span>{rowData.entryDate}</span>;
        },
      },
      {
        title: 'Shift',
        align:'Center',
        render: rowData => {
          return <span>{rowData.shift}</span>;
        },
      },
      {
        title: 'Quantity Inspected',
        align:'center',
        render: rowData => {
          return <span>{rowData.insQuantity}</span>;
        },
      },{
        title: 'Rejected',
        align:'center',
        render: rowData => {
          return <span>{rowData.rejectedQuantity}</span>;
        },
      },{
        title: 'Rework',
        align:'center',
        render: rowData => {
          return <span>{rowData.reworkQuantity}</span>;
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


export default InspectionTable