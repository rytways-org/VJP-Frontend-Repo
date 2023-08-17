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
        return <span>{rowData.user.userName}</span>;
      
      },
    },
    {
      title: 'Request No',
      align:'center',
      render: rowData => {
        return <span>{rowData.requestNo}</span>;
      },
    }, {
      title: `Request Date`,
      align:'center',
      render: rowData => {
        return <span>{rowData.requestDate}</span>;
      },
    },
    {
      title: 'Department',
      align:'center',
      render: rowData => {
        return <span>{rowData.department}</span>;
      },
    },{
      title: 'Description',
      align:'center',
      render: rowData => {
        return <span>{rowData.purpose}</span>;
      },
    },{
      title: 'Approval Remarks',
      align:'center',
      render: rowData => {
        return <span>{rowData.approvalRemarks}</span>;
      },
    },{
      title: 'Status',
      align:'center',
      render: rowData => {
        return (
          <> {["Approved"].includes(`${rowData.status}`) ? <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[2])}>{rowData.status}</span> : <span><span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[3])}>{rowData.status}</span></span>}
           </>)
      },
    },
  ];
};


export default ProductTable