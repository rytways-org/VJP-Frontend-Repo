import React from 'react';
import {AiOutlinePullRequest,AiOutlineBarChart} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements

export const ProductionTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Order No',
      align:'left',
      render: rowData => {
        return <span>{rowData.orderNo}</span>;
      
      },
    },
    {
      title: 'Product Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.productName}</span>;
      },
    }, {
      title: 'Customer Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.product.customer.name}</span>;
      },
    },
    {
      title: 'Target  Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.quantity}</span>;
      },
    },{
      title: 'Finished Goods',
      align:'center',
      render: rowData => {
        return <span>{rowData.fgStock}</span>;
      },
    },
    {
      title: 'Dispatched Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.dispatched}</span>;
      },
    },
    {
      title: 'WIP STOCK',
      align:'center',
      render: rowData => {
        return <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[1])}>{rowData.stkQty}</span> 
      },
    },
    {
      title: 'Balance Quantity',
      align:'center',
      render: rowData => {
        return <span>{0}</span>;
      },
    },
    // {
    //     title: 'Raw Materials',
    //     align:'center',
    //     render: rowData => {
    //       return <AiOutlinePullRequest style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[2])}></AiOutlinePullRequest>
    //     },
    //   },
      // {
      //   title: 'Summary',
      //   align:'center',
      //   render: rowData => {
      //     return <AiOutlineBarChart style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[3])}></AiOutlineBarChart>
      //   },
      // }

  ];
};


export default ProductionTable