import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ProductTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Process Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Po Type',
      align:'center',
      render: rowData => {
        return <span>{rowData.cusName}</span>;
      },
    },
    {
      title: 'Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.description}</span>;
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


export default ProductTable