import React from 'react';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import {AiOutlinePullRequest,AiOutlineReconciliation} from 'react-icons/ai'
import {TbLayoutSidebarLeftExpand} from 'react-icons/tb'
import {GiEntryDoor} from 'react-icons/gi'
import {BsFillPatchCheckFill} from 'react-icons/bs'
// This is the table constant/settings which needed to render table elements

export const JoTable = (showFormHandler,actions) => {
  return [
    {
      title: 'Product Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.order.product.productName}</span>;
      
      },
    },
    {
      title: 'Customer Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.order.product.customer.name}</span>;
      },
    },
    {
      title: 'Vendor Name',
      align:'left',
      render: rowData => {
        return <span>{rowData.supplier.supplierName}</span>;
      },
    },
    {
      title: 'Req Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.requestedQty}</span>;
      },
    },{
      title: 'Apvd Qty',
      align:'left',
      render: rowData => {
        return <span>{rowData.approvedQty}</span>;
      },
    },
    {
        title: 'Status',
        align:'left',
        render: rowData => {
          return (
         <> {["Approved","Awaiting_Approval"].includes(`${rowData.joStatus}`) ? <span style={{cursor:"pointer",color:"blue"}} onClick={showFormHandler(rowData,actions[0])}>{rowData.joStatus}</span> : <span>{rowData.joStatus}</span>}
          </>)
    },
      },{
        title: 'Sent Qty',
        align:'left',
        render: rowData => {
          return <span>{rowData.sentQty}</span>;
        },
      },
    {
        title: 'Rcvd Qty',
        align:'left',
        render: rowData => {
          return <span>{rowData.receivedQty}</span>;
        },
      },
      {
        title: 'Rejd Qty',
        align:'left',
        render: rowData => {
          return <span>{rowData.rejectedQty}</span>;
        },
      },{
        title: 'Rewk Qty',
        align:'left',
        render: rowData => {
          return <span>{rowData.reworkQty}</span>;
        },
      },
      {
        title: 'Out Entry',
        align:'center',
        render: rowData => {
          return (
            <>{["PO_Genereted","Sent"].includes(`${rowData.joStatus}`) &  (rowData.sentQty < rowData.approvedQty) ? 
            <TbLayoutSidebarLeftExpand style={{cursor:"pointer",fontSize: "1.2em"}} onClick={showFormHandler(rowData,actions[1])}></TbLayoutSidebarLeftExpand>: 
            <TbLayoutSidebarLeftExpand style={{color:"gray",fontSize: "1.2em"}}></TbLayoutSidebarLeftExpand>}
       </> )},
      },
    {
      title: 'Return',
      align:'center',
      render: rowData => {
        return (
          <>{ rowData.sentQty > 0 ? 
          <GiEntryDoor style={{cursor:"pointer",fontSize: "1.2em"}} onClick={showFormHandler(rowData,actions[2])}></GiEntryDoor> :  
          <GiEntryDoor style={{color:"gray",fontSize: "1.2em"}} ></GiEntryDoor>}
     </> )
       
      },
    },
    {
      title: 'Insp',
      align:'center',
      render: rowData => {
        return (
          <>{rowData.receivedQty>0 ?
           <BsFillPatchCheckFill style={{cursor:"pointer",fontSize: "1.2em"}} onClick={showFormHandler(rowData,actions[3])}></BsFillPatchCheckFill> : 
           <BsFillPatchCheckFill style={{color:"gray",fontSize: "1.2em"}} ></BsFillPatchCheckFill>}
        </> )
      },
    },{
      title: 'Rework Entry',
      align:'center',
      render: rowData => {
        return (
          <>{rowData.reworkQty>0 ?
           <BsFillPatchCheckFill style={{cursor:"pointer",fontSize: "1.2em"}} onClick={showFormHandler(rowData,actions[4])}></BsFillPatchCheckFill> : 
           <BsFillPatchCheckFill style={{color:"gray",fontSize: "1.2em"}} ></BsFillPatchCheckFill>}
        </> )
      },
    },
  ];
};


export default JoTable