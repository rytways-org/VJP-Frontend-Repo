import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements

export const AuthorityTable = (handleEdit,actions,selectedColumns) => {
  
  return [
    {
      title: 'Sequence No',
      align:'center',
      render: rowData => {
        return <span>{rowData.Lineno}</span>;
      
      },
    },
    {
      title: 'Position',
      align:'center',
      render: rowData => {
        return <span>{rowData.position}</span>;
      },
    },
    {
      title: 'Employee',
      align:'center',
      render: rowData => {
        return <span>{rowData.employee}</span>;
      },
    },
    {
        title: 'Remove',
        align:'center',
        render: rowData => {
          return <FiTrash2 style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FiTrash2>
        },
      }
  ]

};

export default AuthorityTable ;