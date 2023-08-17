import React from 'react';
import * as BsIcons from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {FcViewDetails} from 'react-icons/fc'


// This is the table constant/settings which needed to render table elements
export const ProcessViewTable = (handleEdit,exportTill) => {
  return [
    {
      title: 'Process Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.process.processName}</span>;
      
      },
    },
    {
      title: 'WIP Stock',
      align:'center',
      render: rowData => {
        return <span>{rowData.stockQty}</span>;
      
      },
    }, {
      title: 'Produced Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.producedQty+rowData.rejectedQty}</span>;
      },
    },{
        title: 'Accepted Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.producedQty}</span>;
        },
      }, {
        title: 'Rework Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.reworkQty}</span>;
        },
      }, {
        title: 'Rejected Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.rejectedQty}</span>;
        },
      },  {
        title: 'Jo Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.joQty}</span>;
        },
      },  {
        title: 'Jo Rej Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.joRejQty}</span>;
        },
      }, 
      
  ]
};

// {
//   title: 'View Details',
//   align:'Center',
//   render: rowData => {
//       return <FcViewDetails style={{cursor:"pointer"}} onClick={handleEdit(rowData)}></FcViewDetails>
//     },
// }