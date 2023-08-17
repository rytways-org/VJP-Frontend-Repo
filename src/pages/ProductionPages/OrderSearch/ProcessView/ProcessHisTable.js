import React from 'react';


// This is the table constant/settings which needed to render table elements
export const ProcessHisTable = (handleEdit,exportTill) => {
  return [
    {
      title: 'Date',
      align:'center',
      render: rowData => {
        return <span>{rowData.InWardDate}</span>;
      
      },
    },
    {
        title: 'Available Qty',
        align:'center',
        render: rowData => {
          return <span>{rowData.Inward}</span>;
        
        },
      },
    {
      title: 'Produced Qty',
      align:'center',
      render: rowData => {
        return <span>{rowData.OnWork}</span>;
      },
    }
  ].slice(0,exportTill);
};