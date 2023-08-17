"use strict";(self.webpackChunkcosting=self.webpackChunkcosting||[]).push([[4434,1650,1057],{21216:function(e,t){t.Z={colors:{dg:"#fafafa",dgc:"#f0f0f0",primary:"#007bff",secondary:"#6c757d",cardbody:"#E8F7F2",yllw:"yellow",simcard:"#170462",blk:"black",ttle:"#170462"},margins:{mg0:"0",mg1:"1rem",mg:".5rem .5rem 0 .5rem",mgt:".2rem .0rem"},paddings:{pd0:"0,",pd1:"1rem",pd:"0 1rem 0 1rem",pdc:"0 1.5rem"}}},23118:function(e,t,n){n.d(t,{Z:function(){return S}});var r=n(1413),a=n(70885),o=n(4942),s=n(72791),c={tableBody:"table_tableBody__NaJhZ"},i=n(89743),l=n(2677),d=n(89983),u=(n(77632),n(79836)),p=n(53382),m=n(68745),f=n(90618),h=n(39281),g=n(65136),x=n(35855),Z=n(35527),v=n(56890),b=n(40724),y=n(80184),P=function(e){var t=e.value,n=e.onChange;return(0,y.jsx)("input",{type:"text",placeholder:"Search...",value:t,onChange:function(e){return n(e.target.value)}})},j=(0,b.ZP)(m.Z)((function(e){var t,n=e.theme;return t={},(0,o.Z)(t,"&.".concat(f.Z.head),{backgroundColor:"rgb(0, 92, 185);",color:n.palette.common.white,border:"1px solid #B1BFC3"}),(0,o.Z)(t,"&.".concat(f.Z.body),{fontSize:16,backgroundColor:"#f2f2f2",border:"1px solid #B1BFC3"}),t})),w=(0,b.ZP)(x.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover,borderBottom:"1px solid #B1BFC3"},"&:last-child td, &:last-child th":(0,o.Z)({border:0},"border","1px solid #B1BFC3")}})),C=function(e){var t=e.cols,n=e.data,o=e.rows,m=(e.loadDataonPageChange,e.counts,e.className),f=e.includeCheck,b=e.checkBoxEvent,C=e.value,S=e.onChange,M=e.styles,N=s.useState(0),I=(0,a.Z)(N,2),k=I[0],F=I[1],V=s.useState(o||10),H=(0,a.Z)(V,2),B=H[0],E=H[1],Q=s.useState(o<10?[5,10,25,50,100]:[10,25,50,100]),_=(0,a.Z)(Q,2),A=_[0],D=(_[1],k>0&&Math.max(0,(1+k)*B-n.length),"undefined"===typeof M?{}:M),R="center";return(0,y.jsx)(d.Pd.Provider,{value:{color:"#6495ED"},children:(0,y.jsx)(i.Z,{className:"".concat(c.tableContainer," ").concat(m),style:(0,r.Z)((0,r.Z)({},null===D||void 0===D?void 0:D.tablehead),null!==D&&void 0!==D&&D.tablehead?{}:{background:"transparent"}),children:(0,y.jsx)(Z.Z,{className:c.tableContainer,children:(0,y.jsxs)(h.Z,{className:c.tableStyles,children:[(0,y.jsxs)(i.Z,{className:"justify-content-center align-items-center",style:{backgroundColor:"white",padding:"0 10px 0 10px"},children:[void 0!==C&&S&&(0,y.jsx)(l.Z,{children:(0,y.jsx)(P,{value:C,onChange:S})}),(0,y.jsx)(l.Z,{children:o&&(0,y.jsx)(g.Z,{sx:{padding:"0px",margin:"0px",".MuiTablePagination-selectLabel":{margin:"0px"},".MuiTablePagination-displayedRows":{margin:"0px"}},rowsPerPageOptions:A,component:"div",count:n.length,rowsPerPage:B,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},page:k,onPageChange:function(e,t){F(t)},onRowsPerPageChange:function(e){E(+e.target.value),F(0)},className:c.pagination})})]}),(0,y.jsxs)("div",{style:(0,r.Z)((0,r.Z)({},null===D||void 0===D?void 0:D.table),null!==D&&void 0!==D&&D.table?{}:{background:"transparent"}),className:c.tableBody,children:[(0,y.jsxs)(u.Z,{stickyHeader:!0,className:"table table-bordered table-striped ".concat(c.table),children:[(0,y.jsxs)(v.Z,{children:["                ",(0,y.jsxs)(x.Z,{children:[f&&(0,y.jsx)(j,{align:R,children:(0,y.jsx)("input",{type:"checkbox"})}),(0,y.jsx)(j,{align:R,children:"S.No"}),t.map((function(e,t){return(0,y.jsx)(j,{align:R,children:e.title},t)}))]})]}),n&&(0,y.jsx)(p.Z,{children:n.slice(k*B,k*B+B).map((function(e,n){return(0,y.jsxs)(w,{children:[f&&(0,y.jsx)(j,{align:R,children:(0,y.jsx)("input",{type:"checkbox",onClick:function(t){b(e,t.target.checked)}})}),(0,y.jsx)(j,{children:k*B+n+1}),t.map((function(t,n){return(0,y.jsx)(j,{align:t.align,className:t.hover&&c.hoverclass,children:t.render(e)},n)}))]},n++)}))})]})," "]})]})})})})};C.defaultProps={bordered:!0,hoverable:!1,striped:!1,isDark:!1};var S=C},46844:function(e,t,n){n.d(t,{Z:function(){return m}});var r=n(1413),a=(n(72791),n(38595),n(2144)),o=n(89743),s=n(2677),c=n(43360),i="SearchCard_card__Dzf+K",l="SearchCard_cardHeader__QVtAN",d="SearchCard_cardBody__Yd43+",u="SearchCard_addButton__iMTZ7",p=n(80184);var m=function(e,t){var n="undefined"===typeof e.styles?{}:e.styles;return(0,p.jsxs)(a.Z,{className:i,style:(0,r.Z)((0,r.Z)({},n.search),n.search?{}:{background:"transparent"}),children:[(0,p.jsx)(a.Z.Header,{className:l,children:(0,p.jsxs)(o.Z,{children:[(0,p.jsx)(s.Z,{xs:12,md:e.bottonShow?{span:12}:{span:5,offset:3},className:"d-flex justify-content-center",children:(0,p.jsx)("h4",{children:e.title})}),(0,p.jsx)(s.Z,{xs:12,md:4,className:"d-flex justify-content-end",children:!e.bottonShow&&(0,p.jsx)(c.Z,{variant:"primary",className:u,onClick:e.onHeaderClick,children:e.buttonName})})]})}),(0,p.jsx)(a.Z.Body,{className:d,children:e.children})]})}},14434:function(e,t,n){n.r(t),n.d(t,{default:function(){return H}});var r=n(1413),a=n(42982),o=n(74165),s=n(15861),c=n(70885),i=n(72791),l=n(60057),d=n(46844),u=(n(78431),"orders_container__3kO4z"),p=n(79747),m=n(56355),f=n(80184),h=function(e,t){return[{title:"Product Name",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.productName})}},{title:"Customer Name",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.customer.name})}},{title:"Dims(H,B,L)",align:"center",render:function(e){return(0,f.jsxs)("span",{children:["(",e.height,",",e.breadth,",",e.length,")"]})}},{title:"Internal Part No",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.internalPartCode})}},{title:"Description",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.description})}},{title:"Shot Weight",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.shotWeight})}},{title:"Edit",align:"center",render:function(n){return(0,f.jsx)(m.fmQ,{style:{cursor:"pointer"},onClick:e(n,t[0])})}},{title:"Process",align:"center",render:function(n){return(0,f.jsx)(m.fmQ,{style:{cursor:"pointer"},onClick:e(n,t[2])})}},{title:"Materials",align:"center",render:function(n){return(0,f.jsx)(m.fmQ,{style:{cursor:"pointer"},onClick:e(n,t[3])})}}]},g=n(99355),x=n(21229),Z={upper:{padding:"0"},upperRow:{padding:"0.5rem 1rem"},uppertitle:{borderBottomLeftRadius:0,borderBottomRightRadius:"0",backgroundColor:n(21216).Z.colors.ttle}};var v=function(e){var t=(0,x.ZP)({data:[]}),n=t.get,d=(t.post,t.response),u=(t.loading,t.error,(0,i.useState)([{value:"",label:"Select"}])),p=(0,c.Z)(u,2),m=p[0],h=p[1],v=(0,i.useCallback)((0,s.Z)((0,o.Z)().mark((function t(){var s;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(g.ZP+"/customer/loadOptions");case 2:s=t.sent,h([].concat((0,a.Z)(m),(0,a.Z)(s))),console.log((0,r.Z)({},e.selectedItem));case 5:case"end":return t.stop()}}),t)}))),[n,d]);(0,i.useEffect)((function(){v()}),[]);var y={heading:"New Product",fields:[{title:"Product Name",type:"text",name:"productName",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Customer Name",type:"select",name:"customerId",contains:"Select",options:m},{title:"Shot Weight",type:"text",name:"shotWeight",contains:"text",validation:"Quantity is Required",inpprops:{}},{title:"As Cast Weight",type:"text",name:"asCastWeight",contains:"text",validation:"Quantity is Required",inpprops:{}},{title:"Fg Weight",type:"text",name:"fgWeight",contains:"text",validation:"Quantity is Required",inpprops:{}},{title:"Internal Part Number",type:"text",name:"internalPartCode",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Client Part Number",type:"text",name:"clientPartNumber",contains:"text",inpprops:{minlength:8,maxlength:80}},{title:"Product Category",type:"select",name:"productCategory",contains:"Select",options:[{value:"Select",label:"Select"},{value:"Product1",label:"Product1"},{value:"Product2",label:"Product2"}]},{title:"Product Sub Category",type:"select",name:"prodSubCats",contains:"Select",options:[{value:"Select",label:"Select"},{value:"SubProduct1",label:"SubProduct1"},{value:"SubProduct2",label:"SubProduct2"}]},{title:"Height",type:"text",name:"height",contains:"text",validation:"Quantity is Required",inpprops:{min:0,step:1}},{title:"Breadth",type:"text",name:"breadth",contains:"text",validation:"Quantity is Required",inpprops:{min:0,step:1}},{title:"Width",type:"text",name:"length",contains:"text",validation:"Quantity is Required",inpprops:{}},{title:"Rejection Percentage",type:"text",name:"rejectionPerc",contains:"text",validation:"Rejection Percentage is Required",inpprops:{}},{title:"Description",type:"textarea",name:"description",contains:"textarea",inpprops:{maxlength:256,md:3}},{type:"hidden",name:"productId",contains:"number",inpprops:{min:0,step:1}}]};function P(){return(P=(0,s.Z)((0,o.Z)().mark((function t(n){return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.saveFunction((0,r.Z)({},n));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return(0,f.jsx)(l.Z,{template:y,rowwise:4,validate:b,onSubmit:function(e){return P.apply(this,arguments)},onCancel:e.onCancel,buttonName:"Submit",defaultValues:e.selectedItem,styles:Z})};function b(e,t){var n=t.errors,r=t.setError,a=t.clearErrors;"Admin"===e.firstname?n.firstname||r("firstname",{type:"manual",message:"You cannot use this first name"}):n.firstname&&"manual"===n.firstname.type&&a("firstname")}var y=function(e,t){return[{title:"Process Name",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.process.processName})}},{title:"Sequence No",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.sequenceNo})}},{title:"Fg Process",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.fgProcess})}},{title:"Edit",align:"center",render:function(n){return(0,f.jsx)(m.fmQ,{style:{cursor:"pointer"},onClick:e(n,t[0])})}}]},P=n(23118),j=n(59434),w=n(34476),C=n(4349),S={search:{border:"0px",margin:"0rem"},upper:{padding:".5rem 1rem"}};var M=function(e){var t=(0,i.useState)({}),n=(0,c.Z)(t,2),m=n[0],h=n[1],Z=(0,i.useState)(),v=(0,c.Z)(Z,2),b=v[0],w=v[1],M=(0,i.useState)([{value:"",label:"Select"}]),I=(0,c.Z)(M,2),k=I[0],F=I[1],V=(0,x.ZP)({data:[]}),H=V.get,B=V.post,E=V.response,Q=(V.loading,V.error,(0,j.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]}))),_=(0,c.Z)(Q,3),A=_[0],D=(_[1],_[2],(0,j.v9)((function(e){return[e.modalProps.showModal,e.modalProps.selectedForm,e.modalProps.selectedData]}))),R=(0,c.Z)(D,3),q=R[0],W=(R[1],R[2],(0,j.I0)()),O=function(e,t){W(C.I.showAlertHandler({showAlert:!A,alertMessage:e,alertVariant:t}))},T=(0,i.useCallback)((0,s.Z)((0,o.Z)().mark((function t(){var n;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,H(g.ZP+"/process/loadOptions");case 2:n=t.sent,F([].concat((0,a.Z)(k),(0,a.Z)(n))),console.log((0,r.Z)({},e.selectedItem));case 5:case"end":return t.stop()}}),t)}))),[H,E]),L=(0,i.useCallback)((0,s.Z)((0,o.Z)().mark((function t(){var n;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return E.ok,e.selectedItem.productId,t.next=4,B(g.ZP+"/ppMap/processMaps",{id:e.selectedItem.productId,loadTime:Date().toLocaleString()});case 4:n=t.sent,w(n);case 6:case"end":return t.stop()}}),t)}))),[H,E]);(0,i.useEffect)((function(){L()}),[]),(0,i.useEffect)((function(){T()}),[T]);var Y=function(){var e=(0,s.Z)((0,o.Z)().mark((function e(t){var n,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),n=t.prodProcMapId?"/ppMap/update":"/ppMap/create",e.next=4,B(g.ZP+n,t);case 4:r=e.sent,console.log(r.retValues),1==r.retValues.status?t.prodProcMapId?(w(b.map((function(e){return e.prodProcMapId===r.retValues.processMap.prodProcMapId?r.retValues.processMap:e}))),L(),O(r.retValues.message,"success"),h({})):r.retValues.processMap.prodProcMapId>0&&(w([].concat((0,a.Z)(b),[r.retValues.processMap])),L(),O(r.retValues.message,"success"),h({})):(O(r.retValues.message,"danger"),h({}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(e,t){return function(){"edit"===t&&(h((0,r.Z)({},e)),console.log(m))}},U={fields:[{title:"Process Name",type:"select",name:"processId",contains:"Select",options:k},{title:"Sequence Number",type:"number",name:"sequenceNo",contains:"number",validation:"Quantity is Required",inpprops:{min:1,step:1}},{type:"hidden",name:"productId",contains:"number",value:e.selectedItem.productId},{type:"hidden",name:"prodProcMapId",contains:"number"}]};return(0,f.jsxs)("div",{className:u,children:[(0,f.jsx)(d.Z,{title:"Process Mapping for ".concat(e.selectedItem.productName),buttonName:"Add",onHeaderClick:z({},"productForm"),bottonShow:q,styles:S,children:(0,f.jsx)(l.Z,{template:U,rowwise:3,validate:N,onSubmit:function(e){Y(e)},onCancel:e.onCancel,buttonName:"Save",defaultValues:m,styles:S})}),(0,f.jsx)(p.Z,{md:12,children:b&&(0,f.jsx)(P.Z,{cols:y(z,["edit"]),data:b,rows:10,striped:!0})})]})};function N(e,t){var n=t.errors,r=t.setError,a=t.clearErrors;"Admin"===e.firstname?n.firstname||r("firstname",{type:"manual",message:"You cannot use this first name"}):n.firstname&&"manual"===n.firstname.type&&a("firstname")}var I=function(e,t){return[{title:"Material Name",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.material.materialName})}},{title:"Quantity",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.reqQuantity})}},{title:"UOM",align:"center",render:function(e){return(0,f.jsx)("span",{children:e.material.uom})}},{title:"Edit",align:"center",render:function(n){return(0,f.jsx)(m.fmQ,{style:{cursor:"pointer"},onClick:e(n,t[0])})}}]},k={search:{border:"0px",margin:"0rem"},upper:{padding:".5rem 1rem"}};var F=function(e){var t=(0,i.useState)(""),n=(0,c.Z)(t,2),m=n[0],h=n[1],Z=(0,i.useState)({}),v=(0,c.Z)(Z,2),b=v[0],y=v[1],w=(0,i.useState)(),S=(0,c.Z)(w,2),M=S[0],N=S[1],F=(0,i.useState)([{value:"",label:"Select"}]),V=(0,c.Z)(F,2),H=V[0],B=V[1],E=(0,i.useState)([{value:"",label:"Select"}]),Q=(0,c.Z)(E,2),_=Q[0],A=Q[1],D=(0,i.useState)([{value:"",label:"Select"}]),R=(0,c.Z)(D,2),q=R[0],W=R[1],O=(0,x.ZP)({data:[]}),T=O.get,L=O.post,Y=O.response,z=(O.loading,O.error,(0,i.useState)({materialName:"",uom:""})),U=(0,c.Z)(z,2),J=U[0],K=U[1],G=(0,j.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]})),X=(0,c.Z)(G,3),$=X[0],ee=(X[1],X[2],(0,j.v9)((function(e){return[e.modalProps.showModal,e.modalProps.selectedForm,e.modalProps.selectedData]}))),te=(0,c.Z)(ee,3),ne=te[0],re=(te[1],te[2],(0,j.I0)()),ae=function(e,t){re(C.I.showAlertHandler({showAlert:!$,alertMessage:e,alertVariant:t}))},oe=(0,i.useCallback)((0,s.Z)((0,o.Z)().mark((function t(){var n,s,c;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,T(g.ZP+"/material/loadOptions");case 2:return n=t.sent,W([].concat((0,a.Z)(q),(0,a.Z)(n))),t.next=6,T(g.ZP+"/material/loadMaterialCodeOptions");case 6:return s=t.sent,A([].concat((0,a.Z)(_),(0,a.Z)(s))),t.next=10,L(g.ZP+"/ppMap/loadOptions",{id:e.selectedItem.productId});case 10:c=t.sent,B([].concat((0,a.Z)(H),(0,a.Z)(c))),console.log((0,r.Z)({},e.selectedItem));case 13:case"end":return t.stop()}}),t)}))),[T,Y]),se=(0,i.useCallback)((0,s.Z)((0,o.Z)().mark((function t(){var n;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return Y.ok,e.selectedItem.productId,t.next=4,L(g.ZP+"/pmMap/materialMaps",{id:e.selectedItem.productId,loadTime:Date().toLocaleString()});case 4:n=t.sent,N(n);case 6:case"end":return t.stop()}}),t)}))),[T,Y]),ce=(0,i.useCallback)(function(){var e=(0,s.Z)((0,o.Z)().mark((function e(t){var n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L(g.ZP+"/material/getById",{materialId:t});case 2:n=e.sent,Y.ok?K((function(e){return(0,r.Z)({},n)})):K("Not Available");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[L,Y]);(0,i.useEffect)((function(){se()}),[]),(0,i.useEffect)((function(){oe()}),[oe]);var ie=function(){var e=(0,s.Z)((0,o.Z)().mark((function e(t){var n,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.prodMapId?"/pmMap/update":"/pmMap/create",e.next=3,L(g.ZP+n,t);case 3:1==(r=e.sent).retValues.status?t.prodMatMapId?(N(M.map((function(e){return e.prodMatMapId===r.retValues.materialMap.prodMatMapId?r.retValues.materialMap:e}))),se(),ae(r.retValues.message,"success"),K({materialName:"",uom:""})):r.retValues.materialMap.prodMatMapId>0&&(N([].concat((0,a.Z)(M),[r.retValues.materialMap])),se(),ae(r.retValues.message,"success"),y({}),K({materialName:"",uom:""})):(ae(r.retValues.message,"danger"),y({}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),le=function(e,t){return function(){"edit"===t&&(y((0,r.Z)({},e)),console.log(b))}},de={fields:[{title:"Material Code",type:"select",name:"materialId",contains:"Select",options:_},{title:"Material Name",type:"disabled",name:"materialName",contains:"Select",value:J.materialName},{title:"Process",type:"select",name:"prodProcMapId",contains:"Select",options:H},{title:"Quantity",type:"number",name:"reqQuantity",contains:"number",validation:"Quantity is Required",inpprops:{}},{title:"Uom",type:"disabled",name:"uom",contains:"test",value:J.uom},{type:"hidden",name:"productId",contains:"number",value:e.selectedItem.productId}]};return(0,f.jsxs)("div",{className:u,children:[(0,f.jsx)(d.Z,{title:"Process Mapping for ".concat(e.selectedItem.productName),buttonName:"Add",onHeaderClick:le({},"productForm"),bottonShow:ne,styles:k,children:(0,f.jsx)(l.Z,{template:de,rowwise:3,watchFields:["materialId"],validate:function(e,t){t.errors,t.setError,t.clearErrors,e!=m&&(console.log(e[0]),ce(e[0]),h(e[0]))},onSubmit:function(e){ie(e)},onCancel:e.onCancel,buttonName:"Save",defaultValues:b,styles:k})}),(0,f.jsx)(p.Z,{md:12,children:M&&(0,f.jsx)(P.Z,{cols:I(le,["edit"]),data:M,rows:10,striped:!0})})]})},V={fields:[{title:"Product Name",type:"text",name:"tensile",contains:"text",inpprops:{minlength:0,maxlength:30}},{title:"Customer Name",type:"text",name:"tensile",contains:"text",inpprops:{minlength:0,maxlength:30}},{title:"Internal Part No",type:"text",name:"tensile",contains:"text",inpprops:{minlength:0,maxlength:30}},{title:"Product Category",type:"select",name:"outsouredTo",contains:"Select",options:[{value:"",label:"Select"},{value:1,label:"Category 1"},{value:2,label:"Category 2"}]}]};var H=function(e){var t=(0,i.useState)(),n=(0,c.Z)(t,2),m=n[0],Z=n[1],b=(0,x.ZP)({data:[]}),y=b.get,S=b.post,N=b.response,I=(b.loading,b.error,(0,i.useState)(Math.random())),k=(0,c.Z)(I,2),H=k[0],Q=(k[1],(0,j.v9)((function(e){return[e.alertProps.showAlert,e.alertProps.alertMessage,e.alertProps.alertVariant]}))),_=(0,c.Z)(Q,3),A=_[0],D=(_[1],_[2],(0,j.v9)((function(e){return[e.modalProps.showModal,e.modalProps.selectedForm,e.modalProps.selectedData]}))),R=(0,c.Z)(D,3),q=R[0],W=(R[1],R[2]),O=(0,j.I0)(),T=function(e,t){O(C.I.showAlertHandler({showAlert:!A,alertMessage:e,alertVariant:t}))},L=(0,i.useCallback)((0,s.Z)((0,o.Z)().mark((function e(){var t;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(g.ZP+"/product/products");case 2:t=e.sent,N.ok&&Z(t);case 4:case"end":return e.stop()}}),e)}))),[y,N,H]);(0,i.useEffect)((function(){L()}),[L]);var Y=function(){var e=(0,s.Z)((0,o.Z)().mark((function e(t){var n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S(g.ZP+"/product/create",t);case 2:n=e.sent,N.ok?t.productId?(Z(m.map((function(e){return e.productId===t.productId?t:e}))),O(w.n.hideModalHandler()),T("Product Updated Successfully","success")):(Z([].concat((0,a.Z)(m),[n])),O(w.n.hideModalHandler()),T("Product Created Succesfully","success")):(O(w.n.hideModalHandler()),T("Product Details Failed To Save","danger"));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(e,t){return function(){"productForm"==t?O(w.n.showModalHandler({selectedData:(0,r.Z)({},e),selectedForm:(0,f.jsx)(v,{onCancel:function(){return O(w.n.hideModalHandler())},selectedItem:W,saveFunction:Y}),showModal:!0})):"edit"===t?(console.log((0,r.Z)({},e)),O(w.n.showModalHandler({selectedData:(0,r.Z)({},e),selectedForm:(0,f.jsx)(v,{onCancel:function(){return O(w.n.hideModalHandler())},selectedItem:e,saveFunction:Y}),showModal:!0}))):"processForm"===t?(console.log((0,r.Z)({},e)),O(w.n.showModalHandler({selectedData:{productId:e.productId},selectedForm:(0,f.jsx)(M,{onCancel:function(){return O(w.n.hideModalHandler())},selectedItem:{productId:e.productId,productName:e.productName},saveFunction:Y}),showModal:!0}))):"materialForm"===t&&(console.log((0,r.Z)({},e)),O(w.n.showModalHandler({selectedData:{productId:e.productId},selectedForm:(0,f.jsx)(F,{onCancel:function(){return O(w.n.hideModalHandler())},selectedItem:{productId:e.productId,productName:e.productName},saveFunction:Y}),showModal:!0})))}};return(0,f.jsxs)("div",{className:u,children:[(0,f.jsx)(d.Z,{title:"Product Search",buttonName:"New Product",onHeaderClick:z({},"productForm"),bottonShow:q,children:(0,f.jsx)(l.Z,{template:V,rowwise:4,validate:E,onSubmit:B,onCancel:e.onCancel,buttonName:"Search"})}),(0,f.jsx)(p.Z,{md:12,children:m&&(0,f.jsx)(P.Z,{cols:h(z,["edit","productForm","processForm","materialForm"]),data:m,rows:10})})]})};function B(e){console.log(e)}function E(e,t){var n=t.errors,r=t.setError,a=t.clearErrors;"Admin"===e.firstname?n.firstname||r("firstname",{type:"manual",message:"You cannot use this first name"}):n.firstname&&"manual"===n.firstname.type&&a("firstname")}}}]);
//# sourceMappingURL=4434.731bc860.chunk.js.map