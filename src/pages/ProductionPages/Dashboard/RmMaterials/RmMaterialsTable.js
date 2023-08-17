import React from 'react';
import {AiOutlinePullRequest,AiOutlineBarChart} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const RmMaterialsTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Raw Materials',
      align:'left',
      render: rowData => {
        return <span>{rowData.rmName}</span>;
      
      },
    },
    {
      title: 'Required Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.dQty}</span>;
      },},
    {
      title: 'Avail Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.wQty}</span>;
      },
    },
    {
      title: 'Order Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.tQty}</span>;
      },
    },
    {
      title: 'Yet To Order',
      align:'center',
      render: rowData => {
        return <span>{rowData.noQty}</span>;
      },
    }
  ];
};


export default RmMaterialsTable