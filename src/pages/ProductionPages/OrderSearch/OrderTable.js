import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {FaDailymotion} from 'react-icons/fa'
// This is the table constant/settings which needed to render table elements

export const OrderTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Customer Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.customer.name}</span>;
      },
    },{
      title: 'Product Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.productName}</span>;
      
      },
    },
    {
      title: 'Order No',
      align:'left',
      render: rowData => {
        return (
        <>
        <span>{rowData.orderNo}</span></>
        )
      },
    },
    
    {
      title: ' Part No.',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.internalPartCode}</span>;
      },
    },
    {
      title: 'Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },{
      title: 'Status',
      align:'left',
      render: rowData => {
        return (
        <>{["Awaiting_Approval"].includes(`${rowData.orderStatus}`) ? 
        <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[6])}>{rowData.orderStatus}</span> :
        <span style={{color:"gray"}} >{rowData.orderStatus}</span>
        }</>
         )},
    },
    {
      title: 'Edit',
      align:'center',
      render: rowData => {
        return <FaIcons.FaEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></FaIcons.FaEdit>
      },
    },
    {
      title: 'M.Plan',
      align:'center',
      render: rowData => {
        return <BsIcons.BsCalendar2Month style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[1])}></BsIcons.BsCalendar2Month>
      },
    },
    {
        title: 'J.O',
        align:'center',
        render: rowData => {
          return <AiOutlinePullRequest style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[3])}></AiOutlinePullRequest>
        },
      },{
        title: 'Dispatch',
        align:'center',
        render: rowData => {
          return <FaDailymotion style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[5])}></FaDailymotion>
        },
      },
      {
        title: 'Process',
        align:'center',
        render: rowData => {
          return <FaIcons.FaProductHunt style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[4])}></FaIcons.FaProductHunt>
        },
      }
  ];
};


export default OrderTable