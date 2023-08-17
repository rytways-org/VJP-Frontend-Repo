import React from 'react';

// This is the table constant/settings which needed to render table elements
export const InputSheetTable = (handleEdit) => {
  return [
    {
      title: 'RFQ No',
      render: rowData => {
        return <span>{rowData.name}</span>;
      
      },
    },
    {
      title: 'Customer Name',
      render: rowData => {
        return <span>{rowData.username}</span>;
      },
    },
    {
      title: 'Part Name',
      render: rowData => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      title: 'Fai Quantity',
      render: rowData => {
        return <span>{rowData.phone}</span>;
      },
    },
    {
      title: 'Tooling Cost',
      render: rowData => {
        return <span>{rowData.website}</span>;
      },
    },
    {
      title: 'Action',
      render: rowData => {
        return <button className='btn btn-warning' onClick={handleEdit(rowData)}>Edit</button>
      },
    },
    {
      title: 'Add Process',
      render: rowData => {
        return <button className='btn btn-warning' onClick={handleEdit(rowData)}>Add Process</button>
      },
    },
  ];
};