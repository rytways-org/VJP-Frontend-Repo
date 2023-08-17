import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {FcViewDetails} from 'react-icons/fc'

// This is the table constant/settings which needed to render table elements

export const ProductionTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Product Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.productName}</span>;
      
      },
    },
    {
      title: 'Customer Name',
      align:'center',
      render: rowData => {
        return <span>{rowData.cusName}</span>;
      },
    },
    {
      title: 'Get Details',
      align:'center',
      render: rowData => {
        return <FcViewDetails style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[1])}>{rowData.bQty}</FcViewDetails> 
     },
    }
  ];
};


export default ProductionTable