import React from 'react';


// This is the table constant/settings which needed to render table elements



export const RmTable = (showFormHandler,actions) => {
  
  return [
    {
      title: 'Raw Material',
      align:'center',
      render: rowData => {
        const Ignots = <><span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[1])}>{rowData.RmGrade}</span>
        <br/><p>Alloy-{rowData.Alloy} &nbsp; Runner-{rowData.Runner}</p>
        </>
         return (
       <> {`${rowData.type}`=="Ingots" ?  Ignots : <span>{rowData.RmGrade}</span> }</>
      )},
    },
    {
      title: 'Type',
      align:'center',
      render: rowData => {
        return <span>{rowData.type}</span>;
      
      },
    },
    {
      title: 'Unit Quantity',
      align:'center',
      render: rowData => {
        return <span>{rowData.Qty}</span>;
      
      },
    },
    {
      title: 'Today Requiremnet',
      align:'center',
      render: rowData => {
        const splitUp = <><span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[2])}>{rowData.tQty}</span>
        </>
        return (
          <> {`${rowData.type}`=="Ingots" ?  splitUp : <span>{rowData.tQty}</span> }</>
         )
        ;
      },
    },
    
  ];
};


export default RmTable