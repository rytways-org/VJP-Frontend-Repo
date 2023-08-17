import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements


export const ProcessTable = (showFormHandler,actions,selectedColumns) => {
  return [
    {
      title: 'Process Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.process.processName}</span>;
      },
    },{
        title: 'Inspection Qty',
        align:'center',
        render: rowData => { return <span>{rowData.stockQty}</span>;
    },
      },{
        title: 'Inspection Entry',
        align:'center',
        render: rowData => {
          return( 
            <>{rowData.process.proSubCat==="Quality" ? <BsIcons.BsCalendar2Month style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[0])}></BsIcons.BsCalendar2Month> : "NA"}
            </>) },
      },{
        title: 'Rework Entry',
        align:'center',
        render: rowData => {
          return( 
          <><BsIcons.BsCalendar2Month style={{cursor:"pointer"}} onClick={showFormHandler(rowData,actions[1])}></BsIcons.BsCalendar2Month>
          </>)
          },
      },
  ].filter(function (eachElem, index) {
    return selectedColumns.indexOf(index) == -1
});;
};


export default ProcessTable