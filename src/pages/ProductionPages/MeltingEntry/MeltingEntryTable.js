import React from 'react';
import {FiEdit} from 'react-icons/fi'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'

// This is the table constant/settings which needed to render table elements


export const MeltingEntryTable = (showFormHandler) => {
  return [
    {
        title: 'Melt Date',
        align:'Center',
        render: rowData => {
          return <span>{rowData.MeltingDate}</span>;
        },
      },
      {
        title: 'Shift',
        align:'Center',
        render: rowData => {
          return <span>{rowData.shift}</span>;
        },
      },
    {
      title: 'Melt No',
      align:'center',
      render: rowData => {
        return <span>{rowData.heatNo}</span>;
      },
    },{
        title: 'Furnance',
        align:'center',
        render: rowData => {
          return <span>{rowData.furnace}</span>;
        },
      },{
        title: 'Alloy Grade',
        align:'left',
        render: rowData => {
          return <span>{`${rowData.material.materialName}`}</span>;
        },
      },{
        title: 'Alloy(kgs)',
        align:'left',
        render: rowData => {
          return <span>{`${rowData.materialWeight}`}</span>;
        },
      },
      {
        title: 'Runner(kgs)',
        align:'center',
        render: rowData => {
          return <span>{`${rowData.runnerWeight}`}</span>;
        },
      },{
        title: 'Total Weight',
        align:'center',
        render: rowData => {
          return <span>{rowData.materialWeight + rowData.runnerWeight}</span>;
        },
      },{
        title: 'Edit',
        align:'center',
        render: rowData => {
          return <FiEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,"edit")}></FiEdit>
        },
      },{
        title: 'Holding',
        align:'center',
        render: rowData => {
          return <FiEdit style={{cursor:"pointer"}} onClick={showFormHandler(rowData,"Holding")}></FiEdit>
        },
      }
  ];
};


export default MeltingEntryTable