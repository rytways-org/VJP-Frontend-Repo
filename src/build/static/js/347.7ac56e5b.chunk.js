"use strict";(self.webpackChunkcosting=self.webpackChunkcosting||[]).push([[347],{23118:function(e,n,t){t.d(n,{Z:function(){return P}});var r=t(1413),a=t(70885),i=t(4942),s=t(72791),l={tableBody:"table_tableBody__NaJhZ"},o=t(89743),c=t(2677),d=t(89983),u=(t(77632),t(79836)),h=t(53382),x=t(68745),p=t(90618),m=t(39281),j=t(65136),Z=t(35855),g=t(35527),f=t(56890),y=t(40724),v=t(80184),b=function(e){var n=e.value,t=e.onChange;return(0,v.jsx)("input",{type:"text",placeholder:"Search...",value:n,onChange:function(e){return t(e.target.value)}})},N=(0,y.ZP)(x.Z)((function(e){var n,t=e.theme;return n={},(0,i.Z)(n,"&.".concat(p.Z.head),{backgroundColor:"rgb(0, 92, 185);",color:t.palette.common.white,border:"1px solid #B1BFC3"}),(0,i.Z)(n,"&.".concat(p.Z.body),{fontSize:16,backgroundColor:"#f2f2f2",border:"1px solid #B1BFC3"}),n})),C=(0,y.ZP)(Z.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover,borderBottom:"1px solid #B1BFC3"},"&:last-child td, &:last-child th":(0,i.Z)({border:0},"border","1px solid #B1BFC3")}})),S=function(e){var n=e.cols,t=e.data,i=e.rows,x=(e.loadDataonPageChange,e.counts,e.className),p=e.includeCheck,y=e.checkBoxEvent,S=e.value,P=e.onChange,q=e.styles,k=s.useState(0),M=(0,a.Z)(k,2),w=M[0],B=M[1],D=s.useState(i||10),Q=(0,a.Z)(D,2),R=Q[0],F=Q[1],_=s.useState(i<10?[5,10,25,50,100]:[10,25,50,100]),A=(0,a.Z)(_,2),L=A[0],V=(A[1],w>0&&Math.max(0,(1+w)*R-t.length),"undefined"===typeof q?{}:q),T="center";return(0,v.jsx)(d.Pd.Provider,{value:{color:"#6495ED"},children:(0,v.jsx)(o.Z,{className:"".concat(l.tableContainer," ").concat(x),style:(0,r.Z)((0,r.Z)({},null===V||void 0===V?void 0:V.tablehead),null!==V&&void 0!==V&&V.tablehead?{}:{background:"transparent"}),children:(0,v.jsx)(g.Z,{className:l.tableContainer,children:(0,v.jsxs)(m.Z,{className:l.tableStyles,children:[(0,v.jsxs)(o.Z,{className:"justify-content-center align-items-center",style:{backgroundColor:"white",padding:"0 10px 0 10px"},children:[void 0!==S&&P&&(0,v.jsx)(c.Z,{children:(0,v.jsx)(b,{value:S,onChange:P})}),(0,v.jsx)(c.Z,{children:i&&(0,v.jsx)(j.Z,{sx:{padding:"0px",margin:"0px",".MuiTablePagination-selectLabel":{margin:"0px"},".MuiTablePagination-displayedRows":{margin:"0px"}},rowsPerPageOptions:L,component:"div",count:t.length,rowsPerPage:R,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},page:w,onPageChange:function(e,n){B(n)},onRowsPerPageChange:function(e){F(+e.target.value),B(0)},className:l.pagination})})]}),(0,v.jsxs)("div",{style:(0,r.Z)((0,r.Z)({},null===V||void 0===V?void 0:V.table),null!==V&&void 0!==V&&V.table?{}:{background:"transparent"}),className:l.tableBody,children:[(0,v.jsxs)(u.Z,{stickyHeader:!0,className:"table table-bordered table-striped ".concat(l.table),children:[(0,v.jsxs)(f.Z,{children:["                ",(0,v.jsxs)(Z.Z,{children:[p&&(0,v.jsx)(N,{align:T,children:(0,v.jsx)("input",{type:"checkbox"})}),(0,v.jsx)(N,{align:T,children:"S.No"}),n.map((function(e,n){return(0,v.jsx)(N,{align:T,children:e.title},n)}))]})]}),t&&(0,v.jsx)(h.Z,{children:t.slice(w*R,w*R+R).map((function(e,t){return(0,v.jsxs)(C,{children:[p&&(0,v.jsx)(N,{align:T,children:(0,v.jsx)("input",{type:"checkbox",onClick:function(n){y(e,n.target.checked)}})}),(0,v.jsx)(N,{children:w*R+t+1}),n.map((function(n,t){return(0,v.jsx)(N,{align:n.align,className:n.hover&&l.hoverclass,children:n.render(e)},t)}))]},t++)}))})]})," "]})]})})})})};S.defaultProps={bordered:!0,hoverable:!1,striped:!1,isDark:!1};var P=S},46844:function(e,n,t){t.d(n,{Z:function(){return x}});var r=t(1413),a=(t(72791),t(38595),t(2144)),i=t(89743),s=t(2677),l=t(43360),o="SearchCard_card__Dzf+K",c="SearchCard_cardHeader__QVtAN",d="SearchCard_cardBody__Yd43+",u="SearchCard_addButton__iMTZ7",h=t(80184);var x=function(e,n){var t="undefined"===typeof e.styles?{}:e.styles;return(0,h.jsxs)(a.Z,{className:o,style:(0,r.Z)((0,r.Z)({},t.search),t.search?{}:{background:"transparent"}),children:[(0,h.jsx)(a.Z.Header,{className:c,children:(0,h.jsxs)(i.Z,{children:[(0,h.jsx)(s.Z,{xs:12,md:e.bottonShow?{span:12}:{span:5,offset:3},className:"d-flex justify-content-center",children:(0,h.jsx)("h4",{children:e.title})}),(0,h.jsx)(s.Z,{xs:12,md:4,className:"d-flex justify-content-end",children:!e.bottonShow&&(0,h.jsx)(l.Z,{variant:"primary",className:u,onClick:e.onHeaderClick,children:e.buttonName})})]})}),(0,h.jsx)(a.Z.Body,{className:d,children:e.children})]})}},64277:function(e,n,t){t.d(n,{Z:function(){return f}});var r=t(70885),a=t(72791),i=t(1413),s=(t(38595),t(30717)),l=t(89743),o=t(2677),c=t(61134),d=t(97829),u=t(73728),h=t(80184);var x=function(e){var n=(0,a.useState)(),t=(0,r.Z)(n,2),x=t[0],p=(t[1],(0,a.useState)(e.deliveries)),m=(0,r.Z)(p,2),j=(m[0],m[1],(0,c.cI)({defaultValues:(0,i.Z)({},x)})),Z=j.register,g=j.handleSubmit,f=j.formState.errors,y=(j.watch,j.setError,j.clearErrors,j.setValue,j.reset);return(0,a.useEffect)((function(){y(e.defaultValues)}),[e.defaultValues]),(0,h.jsx)(s.Z,{className:d.Z.formcon,children:(0,h.jsxs)(l.Z,{style:{backgroundColor:"darkgrey",borderRadius:"1em"},children:[(0,h.jsx)(o.Z,{md:{span:3,offset:1},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"lineNo",children:"Material Category"}),(0,h.jsxs)(s.Z.Select,(0,i.Z)((0,i.Z)({id:"items"},Z("quantity",{required:"Items is Required"})),{},{children:[(0,h.jsx)("option",{value:"Adapter",children:"Raw Materials"}),(0,h.jsx)("option",{value:"Conector",children:"Office Supplies"}),(0,h.jsx)("option",{value:"Pins",children:"Electronics"})]})),f.lineNo&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:f.lineNo.message})]},"lineNo")}),(0,h.jsx)(o.Z,{md:{span:3},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"lineNo",children:"Material Sub-Category"}),(0,h.jsxs)(s.Z.Select,(0,i.Z)((0,i.Z)({id:"items"},Z("quantity",{required:"Items is Required"})),{},{children:[(0,h.jsx)("option",{value:"Adapter",children:"Adapter"}),(0,h.jsx)("option",{value:"Conector",children:"Conector"}),(0,h.jsx)("option",{value:"Pins",children:"Pins"})]})),f.lineNo&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:f.lineNo.message})]},"lineNo")}),(0,h.jsx)(o.Z,{md:{span:3},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"lineNo",children:"Material Name"}),(0,h.jsxs)(s.Z.Select,(0,i.Z)((0,i.Z)({id:"items"},Z("quantity",{required:"Items is Required"})),{},{children:[(0,h.jsx)("option",{value:"Adapter",children:"Adapter"}),(0,h.jsx)("option",{value:"Conector",children:"Conector"}),(0,h.jsx)("option",{value:"Pins",children:"Pins"})]})),f.lineNo&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:f.lineNo.message})]},"lineNo")}),(0,h.jsx)(o.Z,{md:{span:3,offset:1},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"quantity",children:"Quantity"}),(0,h.jsx)(s.Z.Control,(0,i.Z)((0,i.Z)({type:"number",id:"quantity",name:"quantity"},Z("quantity",{required:"Quantity is Required"})),{},{min:1,step:1,max:e.maxQty})),f.quantity&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:f.quantity.message})]},"quantity")}),(0,h.jsxs)(o.Z,{md:1,children:[" ",(0,h.jsx)("a",{children:(0,h.jsx)(u.qVg,{size:38,className:d.Z.btnextra,onClick:g((function(n){e.saveDeliveries(n),y()})),hover:!0})})]})]})})},p=t(23118),m=[{id:1,Lineno:"Connecter",Date:"15/10/2022",Quantity:"25",price:"40",uom:"kgs",category:"Raw-Materials",totalPrice:"1000"},{id:2,Lineno:"Tables",Date:"15/11/2022",Quantity:"20",price:"52",uom:"kgs",category:"Raw-Materials",totalPrice:"1040"},{id:3,Lineno:"Stationaries",Date:"15/12/2022",Quantity:"2",price:"400",uom:"meter",category:"Consumable",totalPrice:"800"},{id:4,Lineno:"Pins",Date:"15/01/2023",Quantity:"5",price:"300",uom:"ml",category:"Consumables",totalPrice:"1500"},{id:5,Lineno:"Adapeter",Date:"15/02/2023",Quantity:"7",price:"400",uom:"litre",category:"Raw-Materials",totalPrice:"2800"}],j=t(23853),Z=function(e,n,t){return[{title:"Material Name",align:"center",render:function(e){return(0,h.jsx)("span",{children:e.Lineno})}},{title:"Material Category",align:"center",render:function(e){return(0,h.jsx)("span",{children:e.category})}},{title:"Uom",align:"center",render:function(e){return(0,h.jsx)("span",{children:e.uom})}},{title:"Quantity",align:"center",render:function(e){return(0,h.jsx)("span",{children:e.Quantity})}},{title:"Remove",align:"center",render:function(n){return(0,h.jsx)(j.Ybf,{style:{cursor:"pointer"},onClick:e(n)})}}]};var g=function(e){var n=(0,a.useState)(),t=(0,r.Z)(n,2),u=t[0],x=(t[1],(0,a.useState)(e.deliveries)),p=(0,r.Z)(x,2),m=(p[0],p[1],(0,c.cI)({defaultValues:(0,i.Z)({},u)})),j=m.register,Z=(m.handleSubmit,m.formState.errors),g=(m.watch,m.setError,m.clearErrors,m.setValue,m.reset);return(0,a.useEffect)((function(){g(e.defaultValues)}),[e.defaultValues]),(0,h.jsx)(s.Z,{className:d.Z.formcon,children:(0,h.jsxs)(l.Z,{style:{backgroundColor:"darkgrey",borderRadius:"1em"},children:[(0,h.jsx)("span",{children:"Consumed For Purpose/ Cost Center"}),(0,h.jsx)(o.Z,{md:{span:3,offset:1},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"lineNo",children:"Major"}),(0,h.jsxs)(s.Z.Select,(0,i.Z)((0,i.Z)({id:"items"},j("quantity",{required:"Items is Required"})),{},{children:[(0,h.jsx)("option",{value:"Adapter",children:" Select"}),(0,h.jsx)("option",{value:"Adapter",children:"Production"}),(0,h.jsx)("option",{value:"Conector",children:"Finance"}),(0,h.jsx)("option",{value:"Pins",children:"Admininstration"}),(0,h.jsx)("option",{value:"Pins",children:"General"})]})),Z.lineNo&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:Z.lineNo.message})]},"lineNo")}),(0,h.jsx)(o.Z,{md:{span:3},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"lineNo",children:"Minor"}),(0,h.jsxs)(s.Z.Select,(0,i.Z)((0,i.Z)({id:"items"},j("quantity",{required:"Items is Required"})),{},{children:[(0,h.jsx)("option",{value:"Adapter",children:"Select"}),(0,h.jsx)("option",{value:"Adapter",children:"Foundry"}),(0,h.jsx)("option",{value:"Conector",children:"Machining"}),(0,h.jsx)("option",{value:"Pins",children:"Quality"})]})),Z.lineNo&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:Z.lineNo.message})]},"lineNo")}),(0,h.jsx)(o.Z,{md:{span:3},children:(0,h.jsxs)(s.Z.Group,{children:[(0,h.jsx)(s.Z.Label,{htmlFor:"lineNo",children:"Micro"}),(0,h.jsxs)(s.Z.Select,(0,i.Z)((0,i.Z)({id:"items"},j("quantity",{required:"Items is Required"})),{},{children:[(0,h.jsx)("option",{value:"Adapter",children:"Select"}),(0,h.jsx)("option",{value:"Adapter",children:"Machine 1"}),(0,h.jsx)("option",{value:"Conector",children:"Machine 2"}),(0,h.jsx)("option",{value:"Pins",children:"Process 4"})]})),Z.lineNo&&(0,h.jsx)(s.Z.Text,{className:"text-danger",children:Z.lineNo.message})]},"lineNo")})]})})};var f=function(e){var n=e.data?e.data:[],t=(0,a.useState)(n),i=(0,r.Z)(t,2),s=i[0],l=(i[1],(0,a.useState)({})),o=(0,r.Z)(l,2),c=o[0],d=(o[1],(0,a.useState)(s.length>0?e.maxQty-s.map((function(e){return e.quantity})).reduce((function(e,n){return e+n})):e.maxQty)),u=(0,r.Z)(d,2),j=u[0],f=u[1],y=function(n){f(j-n.quantity),n.revisedDate=n.deliveryDate,e.onDeliveryUpdate(n,"add")};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{saveDeliveries:y,defaultValues:c,maxQty:j}),(0,h.jsx)(x,{saveDeliveries:y,defaultValues:c,maxQty:j}),(0,h.jsx)(p.Z,{data:m,cols:Z((function(n){return function(){f(j+n.quantity),e.onDeliveryUpdate(n,"deleted")}}),"",[6,5])})]})}}}]);
//# sourceMappingURL=347.7ac56e5b.chunk.js.map