import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const MaterialsMasterTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Defect Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.defectName}</span>;
      
      },
    }, {
      title: 'Defect Type',
      align:'center',
      render: rowData => {
        return <span>{rowData.defectType}</span>;
      },
    }, {
      title: 'Defect Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.description}</span>;
      },
    },
      {
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[1])}></FaIcons.FaEdit>
        },
      }
  ];
};


export default MaterialsMasterTable