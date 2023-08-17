import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ProductTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Product Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Customer Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.customer.name}</span>;
      },
    }, {
      title: `Dims(H,B,L)`,
      align:'center',
      render: rowData => {
        return <span>({rowData.height},{rowData.breadth},{rowData.length})</span>;
      },
    }, {
      title: 'Internal Part No',
      align:'center',
      render: rowData => {
        return <span>{rowData.internalPartCode}</span>;
      },
    }, {
      title: 'Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.description}</span>;
      },
    },{
      title: 'Shot Weight',
      align:'center',
      render: rowData => {
        return <span>{rowData.shotWeight}</span>;
      },
    },
      {
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
        },
      },{
        title: 'Process',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[2])}></FaIcons.FaEdit>
        },
      },{
        title: 'Materials',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[3])}></FaIcons.FaEdit>
        },
      }
  ];
};


export default ProductTable