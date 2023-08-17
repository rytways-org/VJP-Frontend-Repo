"use strict";(self.webpackChunkcosting=self.webpackChunkcosting||[]).push([[6643,1650,1057],{21216:function(e,t){t.Z={colors:{dg:"#fafafa",dgc:"#f0f0f0",primary:"#007bff",secondary:"#6c757d",cardbody:"#E8F7F2",yllw:"yellow",simcard:"#170462",blk:"black",ttle:"#170462"},margins:{mg0:"0",mg1:"1rem",mg:".5rem .5rem 0 .5rem",mgt:".2rem .0rem"},paddings:{pd0:"0,",pd1:"1rem",pd:"0 1rem 0 1rem",pdc:"0 1.5rem"}}},23118:function(e,t,r){r.d(t,{Z:function(){return w}});var n=r(1413),a=r(70885),s=r(4942),o=r(72791),c={tableBody:"table_tableBody__NaJhZ"},i=r(89743),l=r(2677),d=r(89983),u=(r(77632),r(79836)),p=r(53382),m=r(68745),f=r(90618),h=r(39281),y=r(65136),Z=r(35855),x=r(35527),j=r(56890),g=r(40724),b=r(80184),v=function(e){var t=e.value,r=e.onChange;return(0,b.jsx)("input",{type:"text",placeholder:"Search...",value:t,onChange:function(e){return r(e.target.value)}})},S=(0,g.ZP)(m.Z)((function(e){var t,r=e.theme;return t={},(0,s.Z)(t,"&.".concat(f.Z.head),{backgroundColor:"rgb(0, 92, 185);",color:r.palette.common.white,border:"1px solid #B1BFC3"}),(0,s.Z)(t,"&.".concat(f.Z.body),{fontSize:16,backgroundColor:"#f2f2f2",border:"1px solid #B1BFC3"}),t})),k=(0,g.ZP)(Z.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover,borderBottom:"1px solid #B1BFC3"},"&:last-child td, &:last-child th":(0,s.Z)({border:0},"border","1px solid #B1BFC3")}})),I=function(e){var t=e.cols,r=e.data,s=e.rows,m=(e.loadDataonPageChange,e.counts,e.className),f=e.includeCheck,g=e.checkBoxEvent,I=e.value,w=e.onChange,N=e.styles,C=o.useState(0),P=(0,a.Z)(C,2),Q=P[0],_=P[1],E=o.useState(s||10),R=(0,a.Z)(E,2),M=R[0],V=R[1],F=o.useState(s<10?[5,10,25,50,100]:[10,25,50,100]),B=(0,a.Z)(F,2),D=B[0],q=(B[1],Q>0&&Math.max(0,(1+Q)*M-r.length),"undefined"===typeof N?{}:N),A="center";return(0,b.jsx)(d.Pd.Provider,{value:{color:"#6495ED"},children:(0,b.jsx)(i.Z,{className:"".concat(c.tableContainer," ").concat(m),style:(0,n.Z)((0,n.Z)({},null===q||void 0===q?void 0:q.tablehead),null!==q&&void 0!==q&&q.tablehead?{}:{background:"transparent"}),children:(0,b.jsx)(x.Z,{className:c.tableContainer,children:(0,b.jsxs)(h.Z,{className:c.tableStyles,children:[(0,b.jsxs)(i.Z,{className:"justify-content-center align-items-center",style:{backgroundColor:"white",padding:"0 10px 0 10px"},children:[void 0!==I&&w&&(0,b.jsx)(l.Z,{children:(0,b.jsx)(v,{value:I,onChange:w})}),(0,b.jsx)(l.Z,{children:s&&(0,b.jsx)(y.Z,{sx:{padding:"0px",margin:"0px",".MuiTablePagination-selectLabel":{margin:"0px"},".MuiTablePagination-displayedRows":{margin:"0px"}},rowsPerPageOptions:D,component:"div",count:r.length,rowsPerPage:M,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},page:Q,onPageChange:function(e,t){_(t)},onRowsPerPageChange:function(e){V(+e.target.value),_(0)},className:c.pagination})})]}),(0,b.jsxs)("div",{style:(0,n.Z)((0,n.Z)({},null===q||void 0===q?void 0:q.table),null!==q&&void 0!==q&&q.table?{}:{background:"transparent"}),className:c.tableBody,children:[(0,b.jsxs)(u.Z,{stickyHeader:!0,className:"table table-bordered table-striped ".concat(c.table),children:[(0,b.jsxs)(j.Z,{children:["                ",(0,b.jsxs)(Z.Z,{children:[f&&(0,b.jsx)(S,{align:A,children:(0,b.jsx)("input",{type:"checkbox"})}),(0,b.jsx)(S,{align:A,children:"S.No"}),t.map((function(e,t){return(0,b.jsx)(S,{align:A,children:e.title},t)}))]})]}),r&&(0,b.jsx)(p.Z,{children:r.slice(Q*M,Q*M+M).map((function(e,r){return(0,b.jsxs)(k,{children:[f&&(0,b.jsx)(S,{align:A,children:(0,b.jsx)("input",{type:"checkbox",onClick:function(t){g(e,t.target.checked)}})}),(0,b.jsx)(S,{children:Q*M+r+1}),t.map((function(t,r){return(0,b.jsx)(S,{align:t.align,className:t.hover&&c.hoverclass,children:t.render(e)},r)}))]},r++)}))})]})," "]})]})})})})};I.defaultProps={bordered:!0,hoverable:!1,striped:!1,isDark:!1};var w=I},46844:function(e,t,r){r.d(t,{Z:function(){return m}});var n=r(1413),a=(r(72791),r(38595),r(2144)),s=r(89743),o=r(2677),c=r(43360),i="SearchCard_card__Dzf+K",l="SearchCard_cardHeader__QVtAN",d="SearchCard_cardBody__Yd43+",u="SearchCard_addButton__iMTZ7",p=r(80184);var m=function(e,t){var r="undefined"===typeof e.styles?{}:e.styles;return(0,p.jsxs)(a.Z,{className:i,style:(0,n.Z)((0,n.Z)({},r.search),r.search?{}:{background:"transparent"}),children:[(0,p.jsx)(a.Z.Header,{className:l,children:(0,p.jsxs)(s.Z,{children:[(0,p.jsx)(o.Z,{xs:12,md:e.bottonShow?{span:12}:{span:5,offset:3},className:"d-flex justify-content-center",children:(0,p.jsx)("h4",{children:e.title})}),(0,p.jsx)(o.Z,{xs:12,md:4,className:"d-flex justify-content-end",children:!e.bottonShow&&(0,p.jsx)(c.Z,{variant:"primary",className:u,onClick:e.onHeaderClick,children:e.buttonName})})]})}),(0,p.jsx)(a.Z.Body,{className:d,children:e.children})]})}},44969:function(e,t,r){},87567:function(e,t,r){r(72791);var n=r(23853),a=r(80184);t.Z=function(e){return[{title:"Entry Date",align:"Center",render:function(e){return(0,a.jsx)("span",{children:e.entryDate})}},{title:"Shift",align:"Center",render:function(e){return(0,a.jsx)("span",{children:e.shift})}},{title:"Quantity Inspected",align:"center",render:function(e){return(0,a.jsx)("span",{children:e.insQuantity})}},{title:"Rejected",align:"center",render:function(e){return(0,a.jsx)("span",{children:e.rejectedQuantity})}},{title:"Rework",align:"center",render:function(e){return(0,a.jsx)("span",{children:e.reworkQuantity})}},{title:"Remarks",align:"center",render:function(e){return(0,a.jsx)("span",{children:e.remarks})}},{title:"Edit",align:"center",render:function(t){return(0,a.jsx)(n.vPQ,{style:{cursor:"pointer"},onClick:e(t,"edit")})}}]}},43354:function(e,t,r){},56643:function(e,t,r){r.r(t),r.d(t,{default:function(){return K}});var n=r(1413),a=r(74165),s=r(42982),o=r(15861),c=r(70885),i=r(72791),l=r(60057),d=r(46844),u=r(78431),p=r(39126),m=r(80184),f=function(e,t,r){return[{title:"Customer",align:"left",render:function(e){return(0,m.jsx)("span",{children:e.product.customer.name})}},{title:"Product Name",align:"left",render:function(e){return(0,m.jsx)("span",{children:e.product.productName})}},{title:"Order No",align:"left",render:function(e){return(0,m.jsx)("span",{children:e.orderNo})}},{title:"Target Qty",align:"right",render:function(e){return(0,m.jsx)("span",{children:e.quantity})}},{title:"Pouring Qty",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.gdcQty})}},{title:"Machining Qty",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.mchQty})}},{title:"Inspection Qty",align:"right",render:function(e){return(0,m.jsx)("span",{children:e.inspectionQty})}},{title:"Inspection Entry",align:"center",render:function(r){return(0,m.jsx)(p.GuI,{style:{cursor:"pointer"},onClick:e(r,t[4])})}}].filter((function(e,t){return-1==r.indexOf(t)}))},h=r(58186),y=(r(43354),r(23118)),Z=r(79747),x=r(30427),j=r(95316),g=r(2144),b=function(e,t,r){return[{title:"Process Name",align:"left",render:function(e){return(0,m.jsx)("span",{children:e.process.processName})}},{title:"Inspection Qty",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.stockQty})}},{title:"Inspection Entry",align:"center",render:function(r){return(0,m.jsx)(m.Fragment,{children:"Quality"===r.process.proSubCat?(0,m.jsx)(p.GuI,{style:{cursor:"pointer"},onClick:e(r,t[0])}):"NA"})}},{title:"Rework Entry",align:"center",render:function(r){return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(p.GuI,{style:{cursor:"pointer"},onClick:e(r,t[1])})})}}].filter((function(e,t){return-1==r.indexOf(t)}))},v=(r(44969),r(89743)),S=r(2677),k="dailyentry_title__EfLjl",I=r(99355),w=r(59434),N=r(21229),C=r(4349),P=r(23853),Q=function(e){return[{title:"Entry Date",align:"Center",render:function(e){return(0,m.jsx)("span",{children:e.entryDate})}},{title:"Shift",align:"Center",render:function(e){return(0,m.jsx)("span",{children:e.shift})}},{title:"Quantity Inspected",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.insQuantity})}},{title:"Rejected",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.rejectedQuantity})}},{title:"Rework",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.reworkQuantity})}},{title:"Remarks",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.remarks})}},{title:"Edit",align:"center",render:function(t){return(0,m.jsx)(P.vPQ,{style:{cursor:"pointer"},onClick:e(t,"edit")})}}]},_=(r(38595),r(30717)),E=r(61134),R=r(97829),M=r(73728),V=r(21216);var F=function(e){var t=(0,i.useState)(),r=(0,c.Z)(t,2),a=r[0],s=(r[1],(0,i.useState)(e.rejections)),o=(0,c.Z)(s,2),l=(o[0],o[1],(0,E.cI)({defaultValues:(0,n.Z)({},a)})),d=l.register,u=l.handleSubmit,p=l.formState.errors,f=(l.watch,l.setError,l.clearErrors,l.setValue,l.reset);return(0,i.useEffect)((function(){f(e.defaultValues)}),[e.defaultValues]),(0,m.jsx)(_.Z,{className:R.Z.formcon,children:(0,m.jsxs)(v.Z,{style:{backgroundColor:V.Z.colors.dgc,borderRadius:"1em"},children:[(0,m.jsx)(S.Z,{children:(0,m.jsxs)(_.Z.Group,{children:[(0,m.jsx)(_.Z.Label,{htmlFor:"defectId",children:"Defect Types"}),(0,m.jsx)(_.Z.Select,(0,n.Z)((0,n.Z)({id:"defectId",name:"defectId"},d("defectId",{required:"Defect Must Be Selected"})),{},{className:R.Z.formBorder,children:e.defects.map((function(e,t){var r=e.value,n=e.label;return(0,m.jsx)("option",{value:r,children:n})}))})),p.defectId&&(0,m.jsx)(_.Z.Text,{className:"text-danger",children:p.defectId.message})]},"defectId")}),(0,m.jsx)(S.Z,{children:(0,m.jsxs)(_.Z.Group,{children:[(0,m.jsx)(_.Z.Label,{htmlFor:"rejectQty",children:"Rejected Qty"}),(0,m.jsx)(_.Z.Control,(0,n.Z)((0,n.Z)({type:"text",id:"rejectQty",name:"rejectQty"},d("rejectQty",{required:"Rejection Quantity is Required"})),{},{className:R.Z.formBorder})),p.rejectQty&&(0,m.jsx)(_.Z.Text,{className:"text-danger",children:p.rejectQty.message})]},"rejectQty")}),(0,m.jsxs)(S.Z,{children:[(0,m.jsxs)(_.Z.Group,{children:[(0,m.jsx)(_.Z.Label,{htmlFor:"rejectSerielNo",children:"Reject SerialNo"}),(0,m.jsx)(_.Z.Control,(0,n.Z)((0,n.Z)({type:"text",id:"rejectedSerialNo",name:"rejectedSerialNo"},d("rejectedSerialNo",{required:"Enter Rejected Seriel No"})),{},{className:R.Z.formBorder})),p.rejectedSerialNo&&(0,m.jsx)(_.Z.Text,{className:"text-danger",children:p.rejectedSerialNo.message})]},"rejectedSerialNo"),(0,m.jsx)(_.Z.Control,(0,n.Z)((0,n.Z)({type:"hidden",id:"insEntryId",name:"insEntryId"},d("insEntryId")),{},{value:e.insEntryId?e.insEntryId:"",className:R.Z.formBorder})),(0,m.jsx)(_.Z.Control,(0,n.Z)((0,n.Z)({type:"hidden",id:"rejectId",name:"rejectId"},d("rejectId")),{},{value:e.rejections?e.rejections.rejectId:"",className:R.Z.formBorder}))]}),(0,m.jsxs)(S.Z,{md:1,children:[" ",(0,m.jsx)("a",{children:(0,m.jsx)(M.qVg,{size:38,className:R.Z.btnextra,onClick:u((function(t){e.saveRejections(t),f()})),hover:!0})})]})]})})},B=function(e,t,r){return[{title:"Reject Type",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.defect.defectName})}},{title:"Reject Quantity",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.rejectQty})}},{title:"Reject Seriel No",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.rejectedSerialNo})}},{title:"Remove",align:"center",render:function(t){return(0,m.jsx)(P.Ybf,{style:{cursor:"pointer"},onClick:e(t)})}}]};var D=function(e){var t=e.data?e.data:[],r=(0,i.useState)(t),n=(0,c.Z)(r,2),a=n[0],s=(n[1],(0,i.useState)({})),o=(0,c.Z)(s,2),l=o[0],d=(o[1],(0,i.useState)(a.length>0?e.maxQty-a.map((function(e){return e.quantity})).reduce((function(e,t){return e+t})):e.maxQty)),u=(0,c.Z)(d,2),p=u[0];return u[1],(0,m.jsxs)("div",{style:{padding:"0rem 1rem"},children:[(0,m.jsx)(F,{saveRejections:function(t){t.random=Math.random(),e.onRejectionUpdate(t,"add")},defaultValues:l,maxQty:p,defects:e.defects}),(0,m.jsx)(y.Z,{data:t,cols:B((function(t){return function(){e.onRejectionUpdate(t,"delete")}}),"",[6,5])})]})},q={table:{padding:"1rem"},upperRow:{margin:"0rem",backgroundColor:V.Z.colors.dg,borderRadius:"1em"}};function A(e,t){var r=t.errors,n=t.setError,a=t.clearErrors;"Admin"===e.firstname?r.firstname||n("firstname",{type:"manual",message:"You cannot use this first name"}):r.firstname&&"manual"===r.firstname.type&&a("firstname")}var O=function(e){var t=(0,w.I0)(),r=(0,i.useState)({}),d=(0,c.Z)(r,2),u=(d[0],d[1],(0,i.useState)(Math.random())),p=(0,c.Z)(u,2),f=p[0],h=p[1],x=(0,i.useState)([{value:"",label:"Select"}]),j=(0,c.Z)(x,2),b=j[0],P=j[1],_=(0,i.useState)([]),E=(0,c.Z)(_,2),R=E[0],M=E[1],F=(0,w.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]})),B=(0,c.Z)(F,3),O=B[0],T=(B[1],B[2],(0,N.ZP)({data:[]})),H=T.get,Y=T.post,z=T.response,G=(T.loading,T.error,(0,i.useState)()),L=(0,c.Z)(G,2),U=L[0],J=L[1],K=(0,i.useState)(0),W=(0,c.Z)(K,2),X=W[0],$=W[1],ee=(0,i.useState)({stock:0,produced:0}),te=(0,c.Z)(ee,2),re=te[0],ne=te[1],ae=(0,i.useState)(e.selectedItem?e.selectedItem.quantity:1),se=(0,c.Z)(ae,2),oe=se[0],ce=(se[1],function(e,r){t(C.I.showAlertHandler({showAlert:!O,alertMessage:e,alertVariant:r}))}),ie=(0,i.useCallback)((0,o.Z)((0,a.Z)().mark((function t(){var r,o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Y(I.ZP+"/inspectionEntry/latestEntry",{orderId:e.orderId,prodProcMapId:e.selectedItem.prodProcMapId,loadState:f});case 2:return r=t.sent,t.next=5,Y(I.ZP+"/ppMap/loadOptionsBefore",{id:e.selectedItem.prodProcMapId});case 5:o=t.sent,M([{value:"",label:"Select"}].concat((0,s.Z)(o))),console.log(r),z.ok&&r.retValues.latestEntries&&J([r.retValues.latestEntries]),ne((function(e){return(0,n.Z)((0,n.Z)({},e),{},{stock:r.retValues.prodStock.stockQuantity?r.retValues.prodStock.stockQuantity:0,produced:r.retValues.prodStock._producedQuantity?r.retValues.prodStock._producedQuantity:0})}));case 10:case"end":return t.stop()}}),t)}))),[Y,z]),le=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var r,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.insEntryId?"/inspectionEntry/update":"/inspectionEntry/create",console.log(r),e.next=4,Y(I.ZP+r,t);case 4:n=e.sent,console.log(n),1==n.retValues.status?t.insEntryId?(J([n.retValues.prodEntry]),h(Math.random()),ce(n.retValues.message,"success"),xe([]),$(0)):n.retValues.prodEntry.insEntryId>0&&(J([n.retValues.prodEntry]),ce(n.retValues.message,"success"),h(Math.random()),xe([]),$(0)):ce(n.retValues.message,"danger");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){ie()}),[f]);var de=(0,i.useState)(),ue=(0,c.Z)(de,2),pe=ue[0],me=ue[1],fe=(0,i.useCallback)((0,o.Z)((0,a.Z)().mark((function t(){var r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,H(I.ZP+"/defect/loadOptions");case 2:r=t.sent,P([].concat((0,s.Z)(b),(0,s.Z)(r))),console.log((0,n.Z)({},e.selectedItem));case 5:case"end":return t.stop()}}),t)}))),[H,z]);(0,i.useEffect)((function(){fe()}),[]);var he=(0,i.useState)([]),ye=(0,c.Z)(he,2),Ze=ye[0],xe=ye[1],je=(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(g.Z,{body:!0,className:k,style:{backgroundColor:V.Z.colors.ttle},children:(0,m.jsxs)(v.Z,{children:[(0,m.jsxs)(S.Z,{style:{backgroundColor:V.Z.colors.yllw,color:V.Z.colors.blk,justifyContent:"left",borderRadius:"5%"},md:2,children:["Stock Qty ",(0,m.jsx)("br",{}),re.stock]}),(0,m.jsxs)(S.Z,{md:{span:6,offset:1},children:[" ",(0,m.jsxs)("h4",{children:["Quality"===e.selectedItem.process.proSubCat?"Inspection":"Line Inspection ".concat(e.selectedItem.process.processName)," "," - ",e.productName]})," "]})]})})}),ge={fields:[{title:"Date",type:"date",name:"entryDate",contains:"date",validation:"Date is Required",inpprops:{format:"dd/mm/yy"}},{title:"Shift",type:"select",name:"shift",validationProps:"Please select Shift",contains:"Select",options:[{value:"",label:"Select"},{value:"Shift_1",label:"Shift 1"},{value:"Shift_2",label:"Shift 2"},{value:"Shift_3",label:"Shift 3"}]},{title:"Inspected Qty",type:"number",name:"insQuantity",contains:"number",inpprops:{min:1,step:1}},{title:"Rework Qty",type:"number",name:"reworkQuantity",contains:"number",inpprops:{min:0,step:1}},{title:"Rework Serial No",type:"textarea",name:"reworkSerialNo",contains:"textarea",inpprops:{maxlength:255,md:4}},{title:"Rework Process",type:"select",name:"reworkMapId",contains:"Select",options:R},{title:"Remarks",type:"textarea",name:"remarks",contains:"textarea",inpprops:{maxlength:128,md:4}},{title:"Rejected Qty",type:"disabled",name:"rejectedQuantity",contains:"number",value:X,inpprops:{min:0,step:1}},{type:"hidden",name:"orderId",contains:"number",value:e.orderId},{type:"hidden",name:"prodProcMapId",contains:"number",value:e.selectedItem.prodProcMapId},{type:"hidden",name:"lineInspection",contains:"number",value:"Quality"===e.selectedItem.process.proSubCat?"No":"Yes"},{type:"hidden",name:"isReworkEntry",contains:"number",value:"No"}]};return(0,m.jsxs)(m.Fragment,{children:[je,(0,m.jsx)(l.Z,{template:ge,watchFields:["firstname"],rowwise:3,validate:A,onSubmit:function(e){e.rejections=Ze,e.rejectedQuantity=X,""==e.reworkMapId&&(e.reworkMapId=R[1].value),le(e)},onCancel:e.onCancel,buttonName:"Save",defaultValues:pe,styles:q,btButtons:(0,m.jsx)(D,{data:Ze,onRejectionUpdate:function(e,t){var r=b.find((function(t){return t.value===Number(e.defectId)})).label;console.log(r),"add"===t?($(X+Number(e.rejectQty)),e.defect={},e.defect.defectName=r,console.log(e),xe((function(t){return[].concat((0,s.Z)(t),[e])}))):(console.log((0,n.Z)({},e)),$(X-Number(e.rejectQty)),xe(Ze.filter((function(t){return t.random!==e.random}))))},maxQty:oe,defects:b})}),(0,m.jsx)(Z.Z,{children:(0,m.jsx)(y.Z,{cols:Q((function(e,t){return function(){"edit"===t&&(me(e),xe(e.rejections),$(Number(e.rejectedQuantity)))}})),data:U})})]})},T=r(87567),H={table:{padding:"1rem"},upper:{margin:"0.5rem 0",padding:"1rem",backgroundColor:V.Z.colors.dg,borderRadius:"1em"}};var Y=function(e){var t=(0,w.I0)(),r=(0,i.useState)({}),d=(0,c.Z)(r,2),u=(d[0],d[1],(0,w.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]}))),p=(0,c.Z)(u,3),f=p[0],h=(p[1],p[2],(0,i.useState)([])),j=(0,c.Z)(h,2),b=j[0],k=j[1],P=(0,N.ZP)({data:[]}),Q=P.get,_=P.post,E=P.response,R=(P.loading,P.error,(0,i.useState)([[]])),M=(0,c.Z)(R,2),F=M[0],B=M[1],D=(0,i.useState)(Math.random()),q=(0,c.Z)(D,2),A=q[0],O=q[1],Y=(0,i.useState)({stock:0,produced:0}),z=(0,c.Z)(Y,2),G=z[0],L=z[1],U=(0,i.useState)(),J=(0,c.Z)(U,2),K=J[0],W=J[1],X=(0,i.useState)([{value:"",label:"Select"}]),$=(0,c.Z)(X,2),ee=$[0],te=$[1],re=function(e,r){t(C.I.showAlertHandler({showAlert:!f,alertMessage:e,alertVariant:r}))},ne=(0,i.useCallback)((0,o.Z)((0,a.Z)().mark((function t(){var r,o;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_(I.ZP+"/inspectionEntry/latestReworkEntry",{orderId:e.orderId,prodProcMapId:e.selectedItem.prodProcMapId,isReworkEntry:"Yes",loadid:Math.random()});case 2:return r=t.sent,console.log(r),E.ok&&r.retValues.latestEntries&&B([r.retValues.latestEntries]),L((function(e){return(0,n.Z)((0,n.Z)({},e),{},{stock:r.retValues.prodStock.rworkIntQuantity,produced:r.retValues.prodStock._producedQuantity})})),W(r.retValues.prodStock.rworkIntQuantity>0?r.retValues.prodStock.rworkIntQuantity:0),t.next=9,_(I.ZP+"/ppMap/loadOptionsAfter",{id:e.selectedItem.prodProcMapId});case 9:o=t.sent,k([{value:"",label:"Select"}].concat((0,s.Z)(o)));case 11:case"end":return t.stop()}}),t)}))),[_,E]),ae=(0,i.useCallback)((0,o.Z)((0,a.Z)().mark((function t(){var r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Q(I.ZP+"/defect/loadOptions");case 2:r=t.sent,te([].concat((0,s.Z)(ee),(0,s.Z)(r))),console.log((0,n.Z)({},e.selectedItem));case 5:case"end":return t.stop()}}),t)}))),[Q,E]);(0,i.useEffect)((function(){ae()}),[]),(0,i.useEffect)((function(){ne()}),[A]);var se=(0,i.useState)(),oe=(0,c.Z)(se,2),ce=oe[0],ie=oe[1],le=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var r,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.insEntryId?"/inpspectionEntry/updateReworkEntry":"/inspectionEntry/insertReworkEntry",console.log(r),e.next=4,_(I.ZP+r,t);case 4:n=e.sent,console.log(n),1==n.retValues.status?t.insEntryId?(B([n.retValues.insEntry]),O(Math.random()),re(n.retValues.message,"success")):n.retValues.insEntry.insEntryId>0&&(B([n.retValues.insEntry]),re(n.retValues.message,"success"),O(Math.random())):re(n.retValues.message,"danger");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),de=(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(g.Z,{body:!0,className:x.Z.rwtitle,style:{backgroundColor:V.Z.colors.ttle},children:(0,m.jsxs)(v.Z,{children:[(0,m.jsxs)(S.Z,{style:{backgroundColor:V.Z.colors.yllw,color:V.Z.colors.blk,justifyContent:"left",borderRadius:"5%"},md:2,children:[" Rework Qty ",(0,m.jsx)("br",{}),G.stock]}),(0,m.jsxs)(S.Z,{md:{span:6,offset:1},children:[" ",(0,m.jsxs)("h4",{children:["Rework Entry-",e.productName," (",e.customerName,")"]})," "]})]})})}),ue={fields:[{title:"Date",type:"date",name:"entryDate",contains:"date",validation:"Date is Required",inpprops:{format:"dd/mm/yy"}},{title:"Shift",type:"select",name:"shift",validationProps:"Please select Shift",contains:"Select",options:[{value:"",label:"Select"},{value:"Shift_1",label:"Shift 1"},{value:"Shift_2",label:"Shift 2"},{value:"Shift_3",label:"Shift 3"}]},{title:"Accepted Qty",type:"number",name:"acceptedQty",contains:"number",inpprops:{min:1,step:1}},{title:"Update Stock To",type:"select",name:"reworkMapId",validationProps:"Please select Process",contains:"Select",options:b},{title:"Defect Type",type:"select",name:"defectId",contains:"Select",options:ee},{title:"Rejected Qty",type:"number",name:"rejectedQuantity",contains:"number",inpprops:{min:0,step:1}},{title:"Remarks",type:"textarea",name:"remarks",contains:"textarea",inpprops:{maxlength:128,md:4}},{title:"Rejected Serial No Eg(2,3,5)",type:"textarea",name:"rejectedSerialNo",contains:"textarea",inpprops:{maxlength:128,md:4}},{type:"hidden",name:"orderId",contains:"number",value:e.orderId},{type:"hidden",name:"prodProcMapId",contains:"number",value:e.selectedItem.prodProcMapId},{type:"hidden",name:"lineInspection",contains:"number",value:"Quality"===e.selectedItem.process.proSubCat?"No":"Yes"},{type:"hidden",name:"isReworkEntry",contains:"number",value:"Yes"},{type:"hidden",name:"reworkQuantity",contains:"number",value:0}]};return(0,m.jsxs)(m.Fragment,{children:[de,(0,m.jsx)(l.Z,{template:ue,watchFields:["rejectedQuantity","acceptedQuantity"],rowwise:3,validate:function(e,t){t.errors,t.setError,t.clearErrors,""!=e[0]&""!=e[1]&&Number(e[0])+Number(e[1])>K&&re("Sum of Accepted qty and Rejected Qty cannot exceed "+K,"danger")},onSubmit:function(e){console.log(e),console.log(e),le(e)},onCancel:e.onCancel,buttonName:"Save",defaultValues:ce,styles:H}),(0,m.jsx)(Z.Z,{children:(0,m.jsx)(y.Z,{cols:(0,T.Z)((function(e,t){return function(){"edit"===t&&(e.acceptedQuantity=e.insQuantity-e.rejectedQuantity,ie(e))}})),data:F})})]})},z={margin:"0",padding:"0"},G={margin:"0rem 1rem"},L={table:{height:"360px"},upper:{padding:"1rem"}};var U=function(e){var t=(0,i.useState)(),r=(0,c.Z)(t,2),s=(r[0],r[1],(0,i.useState)([])),l=(0,c.Z)(s,2),d=l[0],u=l[1],p=((0,w.I0)(),(0,N.ZP)({data:[]})),f=p.get,h=p.post,v=p.response,S=(p.loading,p.error,(0,w.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]}))),k=(0,c.Z)(S,3),C=(k[0],k[1],k[2],(0,i.useCallback)((0,o.Z)((0,a.Z)().mark((function t(){var r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return v.ok,t.next=3,h(I.ZP+"/ppMap/qualityProcessMaps",{id:e.selectedItem.orderId,productId:e.selectedItem.productId,random:Math.random()});case 3:r=t.sent,console.log(r),u(r);case 6:case"end":return t.stop()}}),t)}))),[f,v]));(0,i.useEffect)((function(){C()}),[C]);var P=(0,i.useState)({id:"",Month:"",Year:"",Remarks:"",Quantity:""}),Q=(0,c.Z)(P,2),_=(Q[0],Q[1],(0,i.useState)({showForm:!1,selectedForm:"",title:"",selectedItem:{id:0,productName:"",cusName:"",part:"",quantity:"",cost:""}})),E=(0,c.Z)(_,2),R=E[0],M=E[1],F=function(t,r){return function(){if(console.log((0,n.Z)({},t)),"inspection"==r){var a={showForm:!0,selectedForm:(0,m.jsx)(O,{onCancel:B,selectedItem:(0,n.Z)({},t),orderId:e.selectedItem.orderId,productName:e.selectedItem.product.productName}),selectedItem:(0,n.Z)({},t)};M((0,n.Z)((0,n.Z)({},R),a))}else if("rework"==r){var s={showForm:!0,selectedForm:(0,m.jsx)(Y,{onCancel:B,selectedItem:(0,n.Z)({},t),orderId:e.selectedItem.orderId,productName:e.selectedItem.product.productName,customerName:e.selectedItem.product.customer.name}),selectedItem:(0,n.Z)({},t)};M((0,n.Z)((0,n.Z)({},R),s))}}},B=function(){M((0,n.Z)((0,n.Z)({},R),{},{showForm:!1,selectedForm:"",title:"",selectedItem:(0,n.Z)((0,n.Z)({},R.selectedItem),{id:0,productName:"",cusName:"",part:"",quantity:"",cost:""})}))};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(j.Z,(0,n.Z)((0,n.Z)({},e),{},{showFormHandler:F,size:"xl","aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:R.showForm,onHide:B,children:[(0,m.jsx)(j.Z.Header,{closeButton:!0,children:R.title}),(0,m.jsx)(j.Z.Body,{children:R.selectedForm})]})),(0,m.jsxs)(Z.Z,{upper:z,useUpperTwoStyle:!1,children:[(0,m.jsxs)(g.Z,{body:!0,className:x.Z.title,style:{backgroundColor:V.Z.colors.ttle},children:[(0,m.jsxs)("h5",{children:["Inspection Entry -  "," "," ",e.selectedItem.product.productName," (",e.selectedItem.product.customer.name,")"]})," "]}),(0,m.jsx)(Z.Z,{uppertwo:G,useUpperTwoStyle:!0,className:x.Z.simcard,children:(0,m.jsx)(y.Z,{data:d,cols:b(F,["inspection","rework"],[]),rows:50,styles:L})})]})]})},J=r(34476);var K=function(e){var t=(0,w.v9)((function(e){return[e.modalProps.showModal,e.modalProps.selectedForm,e.modalProps.selectedData]})),r=(0,c.Z)(t,3),p=(r[0],r[1],r[2],(0,w.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]}))),x=(0,c.Z)(p,3),j=(x[0],x[1],x[2],(0,i.useState)([])),g=(0,c.Z)(j,2),b=g[0],v=g[1],S=(0,i.useState)([{value:"",label:"Select"}]),k=(0,c.Z)(S,2),C=k[0],P=k[1],Q=(0,i.useState)([{value:"",label:"Select"}]),_=(0,c.Z)(Q,2),E=_[0],R=_[1],M=(0,w.I0)(),V=(0,N.ZP)({data:[]}),F=V.get,B=V.post,D=V.response,q=(V.loading,V.error,(0,i.useCallback)((0,o.Z)((0,a.Z)().mark((function e(){var t,r,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(I.ZP+"/order/qualityOrders",{id:1,random:Math.random()});case 2:return t=e.sent,e.next=5,F(I.ZP+"/customer/loadOptions");case 5:return r=e.sent,e.next=8,F(I.ZP+"/product/loadOptions");case 8:n=e.sent,D.ok&&(v(t),R([].concat((0,s.Z)(E),(0,s.Z)(r))),P([].concat((0,s.Z)(C),(0,s.Z)(n))));case 10:case"end":return e.stop()}}),e)}))),[F,D]));(0,i.useEffect)((function(){q()}),[q]);var A=(0,i.useState)({showForm:!1,selectedForm:"",selectedItem:{id:0,productName:"",cusName:"",part:"",quantity:"",cost:""}}),O=(0,c.Z)(A,2),T=O[0],H=O[1],Y=function(e,t){return function(){"Inspection"==t&&M(J.n.showModalHandler({selectedData:(0,n.Z)({},e),selectedForm:(0,m.jsx)(U,{onCancel:function(){return M(J.n.hideModalHandler())},selectedItem:(0,n.Z)({},e)}),showModal:!0}))}},z={fields:[{title:"Customer Name",type:"select",name:"customerId",contains:"Select",options:E},{title:"Product Name",type:"select",name:"productId",contains:"Select",options:C},{title:"Order No",type:"text",name:"orderNo",contains:"text",inpprops:{}}]},G=(0,i.useCallback)(function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(I.ZP+"/product/loadProductsByCustomer",{id:t});case 2:r=e.sent,P([{value:"",label:"Select"}].concat((0,s.Z)(r)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[B,D]),L=function(){var e=(0,o.Z)((0,a.Z)().mark((function e(t){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(I.ZP+"/order/searchQualityOrders",t);case 2:r=e.sent,D.ok&&v(r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,m.jsxs)("div",{className:h.Z.container,children:[T.showForm&&(0,m.jsx)(u.Z,{onClose:function(){H((0,n.Z)((0,n.Z)({},T),{},{showForm:!1,selectedForm:"",selectedItem:(0,n.Z)((0,n.Z)({},T.selectedItem),{id:0,productName:"",cusName:"",part:"",quantity:"",cost:""})}))},size:10,children:T.selectedForm}),(0,m.jsx)(d.Z,{title:"Quality Entry",buttonName:"Add",onHeaderClick:Y({},"dailyForm"),bottonShow:!0,children:(0,m.jsx)(l.Z,{template:z,watchFields:["customerId"],rowwise:4,validate:function(e,t){t.errors,t.setError,t.clearErrors,""!=e[0]&&null!=e[0]&&G(e[0])},onSubmit:function(e){L(e)},onCancel:e.onCancel,buttonName:"Search"})}),(0,m.jsx)(Z.Z,{md:12,children:(0,m.jsx)(y.Z,{cols:f(Y,["","","","","Inspection"],[6,7]),data:b,striped:!0,rows:10})})]})}},30427:function(e,t){t.Z={botton:"dailyentry_botton__Bh7MA",monthlyform:"dailyentry_monthlyform__74loJ",ctitle:"dailyentry_ctitle__arWsJ",title:"dailyentry_title__tgDqV",rwtitle:"dailyentry_rwtitle__wKIzn",rtitle:"dailyentry_rtitle__+0aVf",shRow:"dailyentry_shRow__6xKQF",shCol:"dailyentry_shCol__EXl-l",tableCon:"dailyentry_tableCon__rhqdC",formCon:"dailyentry_formCon__AhDr2",btn:"dailyentry_btn__aB8j3",buttCon:"dailyentry_buttCon__uhCIj",modal:"dailyentry_modal__6QNiC"}},58186:function(e,t){t.Z={container:"productionentry_container__Dihgz",btn:"productionentry_btn__gGv10",title:"productionentry_title__bjcwh"}}}]);
//# sourceMappingURL=6643.3ead4391.chunk.js.map