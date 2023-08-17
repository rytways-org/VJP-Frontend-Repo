import React from 'react';
import * as BsIcons from 'react-icons/bs'
import {FaDailymotion} from 'react-icons/fa'
import {BiImport} from 'react-icons/bi'


// This is the table constant/settings which needed to render table elements

export const ProdPlanTable = (showFormHandler,actions,selectedColumns) => {
  return [

    {
      title: 'Order No',
      align:'center',
      render: rowData => {
        return <span>{rowData.order.orderNo}</span>;
      
      },
    },{
      title: 'Product Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.order.product.productName}</span>;
      
      },
    },
    {
      title: 'Customer',
      align:'center',
      render: rowData => {
        return <span>{rowData.order.product.customer.name}</span>;
      },
    },
    {
      title: 'Target Qty',
      align:'Center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },
    {
      title: 'Remarks',
      align:'left',
      render: rowData => {
        return <span>{rowData.remarksForProd}</span>;
      },
    },
    // {
    //   title: 'RM Request',
    //   align:'center',
    //   render: rowData => {
    //     return <BiImport style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[1])}></BiImport>
    //   },
    // },
    {
      title: 'Production Entry',
      align:'center',
      render: rowData => {
        return <BsIcons.BsCalendar2Month style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[2])}></BsIcons.BsCalendar2Month>
      },
    },{
      title: 'Dispatch',
      align:'center',
      render: rowData => {
        return <FaDailymotion style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[3])}></FaDailymotion>
      },
    },
    {
      title: 'Inspection Entry',
      align:'center',
      render: rowData => {
        return <BsIcons.BsCalendar2Month style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[4])}></BsIcons.BsCalendar2Month>
      },
    },
    
   
  ].filter(function (eachElem, index) {
    return selectedColumns.indexOf(index) == -1
});
};


export default ProdPlanTable