import React from 'react';
import * as BsIcons from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const MonthlyPlanTable = (showFormHandler,exportTill) => {
  return [
    {
      title: 'Month',
      align:'center',
      render: rowData => {
        const date= new Date(rowData.startDate)
        return <span>{monthNames[date.getMonth()]}</span>;
      
      },
    },
    {
        title: 'Year',
        align:'center',
        render: rowData => {
          const date= new Date(rowData.startDate)
          return <span>{date.getFullYear()}</span>;
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
        return <FiEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,"edit")}></FiEdit>
      },
    }
  ].slice(0,exportTill);
};