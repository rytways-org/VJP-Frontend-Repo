import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ProcessMapTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Process Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.process.processName}</span>;
      
      },
    },
    {
      title: 'Sequence No',
      align:'center',
      render: rowData => {
        return <span>{rowData.sequenceNo}</span>;
      },
    },{
      title: 'Fg Process',
      align:'center',
      render: rowData => {
        return <span>{rowData.fgProcess}</span>;
      },
    },
      {
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
        },
      }
  ];
};


export default ProcessMapTable