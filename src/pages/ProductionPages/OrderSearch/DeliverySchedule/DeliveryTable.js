import React from 'react';
import {FiEdit,FiTrash2} from 'react-icons/fi'
import {BiRevision} from 'react-icons/bi'
import {FcApproval} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements

export const DeliveryTable = (handleEdit,actions,selectedColumns) => {
  
  return [
    {
      title: 'Line No',
      align:'center',
      render: rowData => {
        return <span>{rowData.lineNo}</span>;
      
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },
    {
      title: 'Delivery Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.deliveryDate}</span>;
      },
    }, {
      title: 'Revised Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.revisedDate}</span>;
      },
    },
    {
        title: 'Remove',
        align:'center',
        render: rowData => {
          return <FiTrash2 style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FiTrash2>
        },
      },{
        title: 'Revise Date',
        align:'center',
        render: rowData => {
          return <BiRevision style={{cursor:"pointer"}} onClick={handleEdit(rowData,actions[0])}></BiRevision>
        },
      },{
        title: 'Accept',
        align:'center',
        render: rowData => {
          return <FcApproval style={{cursor:"pointer"}} onClick={handleEdit(rowData,actions[1])}></FcApproval>
        },
      }
  ].filter(function (eachElem, index) {
    return selectedColumns.indexOf(index) == -1
})
};

export default DeliveryTable ;