import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {TbLayoutSidebarLeftExpand} from 'react-icons/tb'
import {GiEntryDoor} from 'react-icons/gi'
import {BsFillPatchCheckFill} from 'react-icons/bs'
// This is the table constant/settings which needed to render table elements





const contributionStatementData = [
    "RM Cost - RMC",
    "Purchase Cost - PC",
    "As Cast Variable Cost - A",
    "Machining Cost - B",
    "Quality Cost - C",
    "Out Sourcing Cost - D",
    "Other Variable - E",
    "Packing & Transport Cost - F",
    "Total Variable Cost = (A + B + C + D + E + F )",
  ];


export const NpTable = (showFormHandler,actions) => {
    return [
    {
      title: "Contribution Statement",
      align: "center",
      render: rowData => {
        const index = rowData.tableData.id;
        return <span>{contributionStatementData[index]}</span>;
      },
    },
    {
      title: "Normal Contribution",
      align: "center",
     
    },
    {
      title: "With Loading Factor",
      align: "center",
     
    },
  ];
}
  
  export default NpTable;
  