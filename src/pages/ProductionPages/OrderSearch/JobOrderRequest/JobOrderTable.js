import React from 'react';
import * as BsIcons from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {GiEntryDoor} from 'react-icons/gi'


// This is the table constant/settings which needed to render table elements
export const JobOrderTable = (handleEdit,actions,exportTill) => {
  return [
    {
        title: 'Date',
        align:'center',
        render: rowData => {
          return <span>{rowData.joDate}</span>;
        
        },
      },
    {
      title: 'Req_Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.requestedQty}</span>;
      },
    },
    {
        title: 'Remarks',
        align:'left',
        render: rowData => {
          return <span>{rowData.remarks}</span>;
        },
      },
      {
        title: 'Company',
        align:'left',
        render: rowData => {
          return <span>{rowData.supplier.supplierName}</span>;
        },
      },{
        title: 'Going Before',
        align:'left',
        render: rowData => {
          return <span>{rowData.goingBeforeDetails.process.processName}</span>;
        },
      },{
        title: 'Coming After',
        align:'left',
        render: rowData => {
          return <span>{rowData.comingAfterDetails.process.processName}</span>;
        },
      },
      {
        title: 'Status',
        align:'left',
        render: rowData => {
          return <span>{rowData.joStatus}</span>;
        },
      },
      {
      title: 'Edit',
      align:'center',
      render: rowData => {
        return <>{`${rowData.joStatus}`=="Awaiting_Approval" ? <FiEdit style={{cursor:"pointer"}} onClick={handleEdit(rowData,actions[1]) }></FiEdit> : "Cannot Edit"}</>
      },
    }
  ].slice(0,exportTill);
};