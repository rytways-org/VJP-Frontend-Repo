import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const MaterialsMasterTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Material Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.materialName}</span>;
      
      },
    }, {
      title: 'Material Code',
      align:'center',
      render: rowData => {
        return <span>{rowData.materialCode}</span>;
      },
    }, {
      title: 'Material Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.materialDescription}</span>;
      },
    },
    {
      title: 'Internal Part No',
      align:'center',
      render: rowData => {
        return <span>{rowData.internalPartNo}</span>;
      },
    },
    {
      title: 'Uom',
      align:'center',
      render: rowData => {
        return <span>{rowData.uom}</span>;
      },
    },{
      title: 'Unit Price',
      align:'right',
      render: rowData => {
        return <span>{rowData.unitPrice}</span>;
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