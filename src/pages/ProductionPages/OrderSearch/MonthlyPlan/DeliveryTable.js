import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements
export const OrderTable = (handleEdit,showMonthlyFormHandler,showDailyFormHandler,showJOFormHandler,showProViewFormHandler,showDispatchFormHandler) => {
  return [
    {
      title: 'Delivery Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.revisedDate}</span>;
      
      },
    },
    {
      title: 'Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    }
  ];
};


export default OrderTable