"use strict";(self.webpackChunkcosting=self.webpackChunkcosting||[]).push([[529],{21216:function(e,t){t.Z={colors:{dg:"#fafafa",dgc:"#f0f0f0",primary:"#007bff",secondary:"#6c757d",cardbody:"#E8F7F2",yllw:"yellow",simcard:"#170462",blk:"black",ttle:"#170462"},margins:{mg0:"0",mg1:"1rem",mg:".5rem .5rem 0 .5rem",mgt:".2rem .0rem"},paddings:{pd0:"0,",pd1:"1rem",pd:"0 1rem 0 1rem",pdc:"0 1.5rem"}}},23118:function(e,t,a){a.d(t,{Z:function(){return w}});var n=a(1413),r=a(70885),l=a(4942),i=a(72791),s={tableBody:"table_tableBody__NaJhZ"},o=a(89743),c=a(2677),d=a(89983),u=(a(77632),a(79836)),m=a(53382),p=a(68745),h=a(90618),f=a(39281),x=a(65136),g=a(35855),b=a(35527),v=a(56890),Z=a(40724),y=a(80184),j=function(e){var t=e.value,a=e.onChange;return(0,y.jsx)("input",{type:"text",placeholder:"Search...",value:t,onChange:function(e){return a(e.target.value)}})},S=(0,Z.ZP)(p.Z)((function(e){var t,a=e.theme;return t={},(0,l.Z)(t,"&.".concat(h.Z.head),{backgroundColor:"rgb(0, 92, 185);",color:a.palette.common.white,border:"1px solid #B1BFC3"}),(0,l.Z)(t,"&.".concat(h.Z.body),{fontSize:16,backgroundColor:"#f2f2f2",border:"1px solid #B1BFC3"}),t})),C=(0,Z.ZP)(g.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover,borderBottom:"1px solid #B1BFC3"},"&:last-child td, &:last-child th":(0,l.Z)({border:0},"border","1px solid #B1BFC3")}})),N=function(e){var t=e.cols,a=e.data,l=e.rows,p=(e.loadDataonPageChange,e.counts,e.className),h=e.includeCheck,Z=e.checkBoxEvent,N=e.value,w=e.onChange,P=e.styles,M=i.useState(0),k=(0,r.Z)(M,2),_=k[0],B=k[1],F=i.useState(l||10),D=(0,r.Z)(F,2),H=D[0],E=D[1],I=i.useState(l<10?[5,10,25,50,100]:[10,25,50,100]),A=(0,r.Z)(I,2),K=A[0],Y=(A[1],_>0&&Math.max(0,(1+_)*H-a.length),"undefined"===typeof P?{}:P),U="center";return(0,y.jsx)(d.Pd.Provider,{value:{color:"#6495ED"},children:(0,y.jsx)(o.Z,{className:"".concat(s.tableContainer," ").concat(p),style:(0,n.Z)((0,n.Z)({},null===Y||void 0===Y?void 0:Y.tablehead),null!==Y&&void 0!==Y&&Y.tablehead?{}:{background:"transparent"}),children:(0,y.jsx)(b.Z,{className:s.tableContainer,children:(0,y.jsxs)(f.Z,{className:s.tableStyles,children:[(0,y.jsxs)(o.Z,{className:"justify-content-center align-items-center",style:{backgroundColor:"white",padding:"0 10px 0 10px"},children:[void 0!==N&&w&&(0,y.jsx)(c.Z,{children:(0,y.jsx)(j,{value:N,onChange:w})}),(0,y.jsx)(c.Z,{children:l&&(0,y.jsx)(x.Z,{sx:{padding:"0px",margin:"0px",".MuiTablePagination-selectLabel":{margin:"0px"},".MuiTablePagination-displayedRows":{margin:"0px"}},rowsPerPageOptions:K,component:"div",count:a.length,rowsPerPage:H,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},page:_,onPageChange:function(e,t){B(t)},onRowsPerPageChange:function(e){E(+e.target.value),B(0)},className:s.pagination})})]}),(0,y.jsxs)("div",{style:(0,n.Z)((0,n.Z)({},null===Y||void 0===Y?void 0:Y.table),null!==Y&&void 0!==Y&&Y.table?{}:{background:"transparent"}),className:s.tableBody,children:[(0,y.jsxs)(u.Z,{stickyHeader:!0,className:"table table-bordered table-striped ".concat(s.table),children:[(0,y.jsxs)(v.Z,{children:["                ",(0,y.jsxs)(g.Z,{children:[h&&(0,y.jsx)(S,{align:U,children:(0,y.jsx)("input",{type:"checkbox"})}),(0,y.jsx)(S,{align:U,children:"S.No"}),t.map((function(e,t){return(0,y.jsx)(S,{align:U,children:e.title},t)}))]})]}),a&&(0,y.jsx)(m.Z,{children:a.slice(_*H,_*H+H).map((function(e,a){return(0,y.jsxs)(C,{children:[h&&(0,y.jsx)(S,{align:U,children:(0,y.jsx)("input",{type:"checkbox",onClick:function(t){Z(e,t.target.checked)}})}),(0,y.jsx)(S,{children:_*H+a+1}),t.map((function(t,a){return(0,y.jsx)(S,{align:t.align,className:t.hover&&s.hoverclass,children:t.render(e)},a)}))]},a++)}))})]})," "]})]})})})})};N.defaultProps={bordered:!0,hoverable:!1,striped:!1,isDark:!1};var w=N},46844:function(e,t,a){a.d(t,{Z:function(){return p}});var n=a(1413),r=(a(72791),a(38595),a(2144)),l=a(89743),i=a(2677),s=a(43360),o="SearchCard_card__Dzf+K",c="SearchCard_cardHeader__QVtAN",d="SearchCard_cardBody__Yd43+",u="SearchCard_addButton__iMTZ7",m=a(80184);var p=function(e,t){var a="undefined"===typeof e.styles?{}:e.styles;return(0,m.jsxs)(r.Z,{className:o,style:(0,n.Z)((0,n.Z)({},a.search),a.search?{}:{background:"transparent"}),children:[(0,m.jsx)(r.Z.Header,{className:c,children:(0,m.jsxs)(l.Z,{children:[(0,m.jsx)(i.Z,{xs:12,md:e.bottonShow?{span:12}:{span:5,offset:3},className:"d-flex justify-content-center",children:(0,m.jsx)("h4",{children:e.title})}),(0,m.jsx)(i.Z,{xs:12,md:4,className:"d-flex justify-content-end",children:!e.bottonShow&&(0,m.jsx)(s.Z,{variant:"primary",className:u,onClick:e.onHeaderClick,children:e.buttonName})})]})}),(0,m.jsx)(r.Z.Body,{className:d,children:e.children})]})}},81529:function(e,t,a){a.r(t),a.d(t,{default:function(){return D}});var n=a(1413),r=a(42982),l=a(74165),i=a(15861),s=a(70885),o=a(72791),c=a(60057),d=a(46844),u=(a(78431),a(56355)),m=a(80184),p=function(e,t){return[{title:"Material Name",align:"left",render:function(e){return(0,m.jsx)("span",{children:e.materialName})}},{title:"Material Code",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.materialCode})}},{title:"Material Description",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.materialDescription})}},{title:"Internal Part No",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.internalPartNo})}},{title:"Uom",align:"center",render:function(e){return(0,m.jsx)("span",{children:e.uom})}},{title:"Unit Price",align:"right",render:function(e){return(0,m.jsx)("span",{children:e.unitPrice})}},{title:"Edit",align:"center",render:function(a){return(0,m.jsx)(u.fmQ,{style:{cursor:"pointer"},onClick:e(a,t[1])})}}]},h="orders_container__K0ZGE",f=a(23118),x=a(79747),g=a(2144),b=a(89743),v=a(2677),Z=a(21216),y={upper:{padding:".5rem 1rem"}},j={fields:[{title:"Material Name",type:"text",name:"materialName",contains:"text",inpprops:{minlength:2,maxlength:80}},{title:"Material Code",type:"text",name:"materialCode",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Material Desc",type:"textarea",name:"materialDescription",contains:"textarea",inpprops:{maxlength:256,md:3}},{title:"Supplier Part No",type:"text",name:"supplierPartNo",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Internal Part No",type:"text",name:"internalPartNo",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Material Category",type:"select",name:"category",contains:"Select",options:[{value:"Select",label:"Select"},{value:"Domestic",label:"Domestic"},{value:"Export",label:"Export"}]},{title:"Minimum Stock",type:"number",name:"minimumStock",contains:"number",inpprops:{}},{title:"Uom",type:"select",name:"uom",contains:"Select",options:[{value:"Select",label:"Select"},{value:"Liter",label:"Liter"},{value:"KiloGrams",label:"Kilograms"},{value:"Meter",label:"Meter"},{value:"SquareMeter",label:"Sq-Meter"},{value:"Quantity",label:"Count-Quantity"}]},{title:"Unit Price",type:"number",name:"unitPrice",contains:"number",inpprops:{}},{title:"HSN Code",type:"text",name:"materialCode",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Gst %",type:"select",name:"gst",contains:"Select",options:[{value:0,label:"Select"},{value:1,label:"0"},{value:5,label:"5"},{value:12,label:"12"},{value:18,label:"18"},{value:28,label:"28"}]},{title:"Approval Required",type:"select",name:"uom",contains:"Select",options:[{value:"Select",label:"Select"},{value:"Liter",label:"Yes"},{value:"KiloGrams",label:"No"}]},{title:"Is Active",type:"select",name:"status",contains:"Select",options:[{value:"Select",label:"Select"},{value:"Yes",label:"Yes"},{value:"No",label:"No"}]},{type:"hidden",name:"materialId",contains:"text"}]},S=(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(g.Z,{body:!0,className:"customer_title__wlP0K",style:{backgroundColor:Z.Z.colors.ttle},children:(0,m.jsx)(b.Z,{children:(0,m.jsxs)(v.Z,{md:{span:6,offset:3},children:[" ",(0,m.jsx)("h4",{style:{color:"white"},children:"New Materials"})," "]})})})});var C=function(e){function t(){return(t=(0,i.Z)((0,l.Z)().mark((function t(a){return(0,l.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.customerSave((0,n.Z)({},a));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return(0,m.jsxs)(m.Fragment,{children:[S,(0,m.jsx)(c.Z,{template:j,rowwise:4,validate:N,onSubmit:function(e){return t.apply(this,arguments)},onCancel:e.onCancel,buttonName:"Submit",defaultValues:e.selectedItem,styles:y})]})};function N(e,t){var a=t.errors,n=t.setError,r=t.clearErrors;"Admin"===e.firstname?a.firstname||n("firstname",{type:"manual",message:"You cannot use this first name"}):a.firstname&&"manual"===a.firstname.type&&r("firstname")}var w=a(59434),P=a(34476),M=a(4349),k=a(99355),_=a(21229),B={fields:[{title:"Material Name",type:"text",name:"customerName",contains:"text",inpprops:{minlength:0,maxlength:30}}]},F=["edit","customerForm","dispatch","approval"];var D=function(e){var t=(0,_.ZP)({data:[]}),a=t.get,u=t.post,g=t.response,b=(t.loading,t.error,(0,o.useState)(Math.random())),v=(0,s.Z)(b,2),Z=v[0],y=(v[1],(0,o.useState)([])),j=(0,s.Z)(y,2),S=j[0],N=j[1],D=(0,w.v9)((function(e){return[e.modalProps.showModal,e.modalProps.selectedForm,e.modalProps.selectedData]})),I=(0,s.Z)(D,3),A=I[0],K=(I[1],I[2]),Y=(0,w.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]})),U=(0,s.Z)(Y,3),G=U[0],L=(U[1],U[2],(0,w.I0)()),Q=(0,o.useCallback)((0,i.Z)((0,l.Z)().mark((function e(){var t;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a(k.ZP+"/material/materials");case 2:t=e.sent,g.ok&&N(t);case 4:case"end":return e.stop()}}),e)}))),[a,g,Z]);(0,o.useEffect)((function(){Q()}),[Q]);var T=function(){var e=(0,i.Z)((0,l.Z)().mark((function e(t){var a;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(k.ZP+"/material/create",t);case 2:a=e.sent,g.ok?t.materialId?(N(S.map((function(e){return e.materialId===t.materialId?t:e}))),L(P.n.hideModalHandler()),V("Material Updated Successfully","success")):(N([].concat((0,r.Z)(S),[a])),L(P.n.hideModalHandler()),V("Material Created Succesfully","success")):(L(P.n.hideModalHandler()),V("Material Details Failed To Save","danger"));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=function(e,t){L(M.I.showAlertHandler({showAlert:!G,alertMessage:e,alertVariant:t}))},q=function(e,t){return function(){console.log(t),"edit"===t?L(P.n.showModalHandler({selectedData:(0,n.Z)({},e),selectedForm:(0,m.jsx)(C,{onCancel:function(){return L(P.n.hideModalHandler())},selectedItem:K,customerSave:T}),showModal:!0})):"customerForm"===t&&L(P.n.showModalHandler({selectedData:(0,n.Z)({},e),selectedForm:(0,m.jsx)(C,{onCancel:function(){return L(P.n.hideModalHandler())},selectedItem:(0,n.Z)({},e),customerSave:T}),showModal:!0}))}};return(0,m.jsxs)("div",{className:h,children:[(0,m.jsx)(d.Z,{title:"Materials Search",buttonName:"New Materials",onHeaderClick:q({},"customerForm"),bottonShow:A,children:(0,m.jsx)(c.Z,{template:B,rowwise:4,validate:E,onSubmit:H,onCancel:e.onCancel,buttonName:"Search"})}),(0,m.jsx)(x.Z,{md:12,children:(0,m.jsx)(f.Z,{cols:p(q,F),data:S,rows:10})})]})};function H(e){console.log(e)}function E(e,t){var a=t.errors,n=t.setError,r=t.clearErrors;"Admin"===e.firstname?a.firstname||n("firstname",{type:"manual",message:"You cannot use this first name"}):a.firstname&&"manual"===a.firstname.type&&r("firstname")}}}]);
//# sourceMappingURL=529.4ecc9ff3.chunk.js.map