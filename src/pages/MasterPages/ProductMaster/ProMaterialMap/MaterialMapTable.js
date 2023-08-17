import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const MaterialMapTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Material Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.material.materialName}</span>;
      
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.reqQuantity}</span>;  
      },
    },{
      title: 'UOM',
      align:'center',
      render: rowData => {
        return <span>{rowData.material.uom}</span>;
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


export default MaterialMapTable