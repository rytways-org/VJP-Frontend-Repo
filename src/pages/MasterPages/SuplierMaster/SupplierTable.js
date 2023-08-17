import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements
export const SupplierTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Supplier Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.supplierName}</span>;
      
      },
    },{
      title: 'Supplier Address',
      align:'center',
      render: rowData => {
        return <span>{rowData.supplierAddress}</span>;
      },
    }, {
      title: 'Contact No',
      align:'center',
      render: rowData => {
        return <span>{rowData.contactNo}</span>;
      },
    }, {
      title: 'Supllier Email',
      align:'center',
      render: rowData => {
        return <span>{rowData.contactEmail}</span>;
      },
    },
    {
      title: 'Supplier Category',
      align:'center',
      render: rowData => {
        return <span>{rowData.category}</span>;
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


export default SupplierTable