import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ProductTable = (showFormHandler,actions) => {
  return [
    {
      title: 'User Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Request No',
      align:'center',
      render: rowData => {
        return <span>{rowData.internalPartNo}</span>;
      },
    }, {
      title: `Request Date`,
      align:'center',
      render: rowData => {
        return <span>({rowData.date})</span>;
      },
    }, {
      title: 'Department',
      align:'center',
      render: rowData => {
        return <span>{rowData.dims}</span>;
      },
    }, {
      title: 'Cost Center',
      align:'center',
      render: rowData => {
        return <span>{rowData.shotWeight}</span>;
      },
    },{
      title: 'Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.description}</span>;
      },
    },{
      title: 'Status',
      align:'center',
      render: rowData => {
        return (
          <> {["Requested","Approved"].includes(`${rowData.status}`) ? <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[2])}>{rowData.status}</span> : <span>{rowData.status}</span>}
           </>)
      },
    },
      {
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
        },
      },
  ];
};


export default ProductTable