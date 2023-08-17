import React from 'react';
import * as BsIcons from 'react-icons/bs'
import {FaDailymotion} from 'react-icons/fa'
import {BiImport} from 'react-icons/bi'


// This is the table constant/settings which needed to render table elements

export const ProdPlanTable = (showFormHandler,actions,selectedColumns) => {
  return [
    {
      title: 'Customer',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.customer.name}</span>;
      },
    },
   {
      title: 'Product Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.productName}</span>;
      
      },
    }, {
      title: 'Order No',
      align:'left',
      render: rowData => {
        return <span>{rowData.orderNo}</span>;
      
      },
    },
    {
      title: 'Target Qty',
      align:'right',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },{
      title: 'Pouring Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.gdcQty}</span>;
      },
    },{
      title: 'Machining Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.mchQty}</span>;
      },
    },{
      title: 'Inspection Qty',
      align:'right',
      render: rowData => {
        return <span>{rowData.inspectionQty}</span>;
      },
    },
    {
      title: 'Inspection Entry',
      align:'center',
      render: rowData => {
        return <BsIcons.BsCalendar2Month style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[4])}></BsIcons.BsCalendar2Month>
      },
    },
  ]
};


export default ProdPlanTable