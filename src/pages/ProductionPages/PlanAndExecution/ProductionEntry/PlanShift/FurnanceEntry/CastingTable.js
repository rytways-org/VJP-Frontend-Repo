import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
// This is the table constant/settings which needed to render table elements


export const CastingTable = (showFormHandler) => {
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
      title: 'Heat No',
      align:'left',
      render: rowData => {
        return <span>{rowData.meltingEntry.heatNo}</span>;
      },
    },{
        title: 'SerielNo From',
        align:'center',
        render: rowData => {
          return <span>{rowData.serielNofrom}</span>;
        },
      },{
        title: 'SerielNo To',
        align:'center',
        render: rowData => {
          return <span>{rowData.serielNoTo}</span>;
        },
      },
      {
        title: 'Quantity',
        align:'center',
        render: rowData => {
          return <span>{rowData.quantity}</span>;
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


export default CastingTable