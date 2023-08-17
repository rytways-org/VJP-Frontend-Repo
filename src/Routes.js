import React from 'react';
import { Route } from 'react-router-dom';

const Modules = React.lazy(() => import('./pages/Modules/Modules'));
const InputSheet = React.lazy(() => import('./pages/inputSheet/InputSheet'));
const InputSheetSearch = React.lazy(() => import('./pages/inputSheet/InputSheetSearch'));
const Process = React.lazy(() => import('./pages/process/Process'));
const OrderSearch = React.lazy(() => import('./pages/ProductionPages/OrderSearch/OrderSearch'));
const PlanSearch = React.lazy(() => import('./pages/ProductionPages/ProductionEntry/PlanSearch'));
const JoSearch = React.lazy(() => import('./pages/ProductionPages/JoSearch/JoSearch'));
const QualityEntry = React.lazy(() => import('./pages/QualityPages/QualityEntry'));
const CustomerSearch = React.lazy(() => import('./pages/MasterPages/CustomerMaster/CustomerSearch'));
const ProductSearch = React.lazy(() => import('./pages/MasterPages/ProductMaster/ProductSearch'));
const ProductionSummary =React.lazy(()=>import('./pages/ProductionPages/Dashboard/ProductionSummary'));
const POSearch =React.lazy(()=>import('./pages/PurchasePages/PoSearch/POSearch'));
const ApprovalProcess =React.lazy(()=>import('./pages/MasterPages/ApprovalProcess/ApprovalProcess'));
const PdfView = React.lazy(()=>import('./pages/Documents/DocumentRender'));
const htmlView = React.lazy(()=>import('./pages/Documents/POorder'));
const MaterialSearch = React.lazy(() => import('./pages/MasterPages/MaterialMaster/MaterialMasterSearch'));
const SupplierSearch = React.lazy(() => import('./pages/MasterPages/SuplierMaster/SupplierSearch'));
const PurchaseRequest = React.lazy(() => import('./pages/PurchasePages/MaterialPR/MaterialRequestSearch'));
const ServiceRequest = React.lazy(() => import('./pages/PurchasePages/ServicePr/ServiceRequestSearch'));
//const GeneratePo = React.lazy(() => import('./pages/PurchasePages/GeneratePo/ApprovedRequestSearch'));
const PrSearch= React.lazy(() => import('./pages/PurchasePages/PurchaseRequest/PurchaseRequestSearch'));
const GateSearch= React.lazy(() => import('./pages/StoresPages/GateEntry/GateEntrySearch'));
const StockInward= React.lazy(() => import('./pages/StoresPages/StockInward/StockInwardSearch'));
const StoresMatRequest= React.lazy(() => import('./pages/StoresPages/MaterialRequestOld/MaterialSearch'));
const StoresItemsRequest= React.lazy(() => import('./pages/StoresPages/MaterialItemsReqSearch/MaterialRequestSearch'));
const DamagedGoods= React.lazy(() => import('./pages/StoresPages/DamagedGoods/DamagedGoodsSearch'));
const MaterialSearchStores = React.lazy(() => import('./pages/MasterPages/MaterialMaster/MaterialMasterSearch'));
const PrTemplate= React.lazy(() => import('./pages/PurchasePages/PRTemplate/PrTemplateSearch'));
const PurJorder= React.lazy(() => import('./pages/PurchasePages/JobOrderRequest/JoSearch'));
const GrnEntry= React.lazy(() => import('./pages/StoresPages/GateEntryW/GateEntrySearch'));
const PlanAndExecution= React.lazy(() => import('./pages/ProductionPages/PlanAndExecution/PlanSearch'));
const MeltingEntry= React.lazy(() => import('./pages/ProductionPages/MeltingEntry/MeltingEntry'));
const Login= React.lazy(() => import('./pages/Login'));
const DownloadPdf= React.lazy(() => import('./pages/PurchasePages/PoSearch/ViewPo/PDFView'));
const MaterialRequest= React.lazy(() => import('./pages/ProductionPages/MaterialRequest/MaterialRequestSearch'));
const StoresRequest= React.lazy(() => import('./pages/StoresPages/MaterialRequest/MaterialRequestSearch'));
const Newproducts= React.lazy(() => import('./pages/Coasting/NewProducts/Newproducts') );
const PoEntry= React.lazy(() => import('./pages/PurchasePages/PoSearch/GeneratePo/PoEntry'));
const ServicePoEntry= React.lazy(() => import('./pages/PurchasePages/PoSearch/ServicePo/ServicePoEntry'));
const DefectSearch = React.lazy(() => import('./pages/MasterPages/DefectMaster/DefectMasterSearch'));
const InsEntrySearch= React.lazy(() => import('./pages/QualityPages/EntrySearch/InsEntrySearch'));


export default [
    <Route path='/login' exact component={Login}/>,
    <Route path='/modules' exact component={Modules}/>,
    <Route path='/inputsheet' exact component={InputSheet} />,
    <Route path='/inputsheetsearch' component={InputSheetSearch}></Route>,
    <Route path='/process' exact component={Process} />,
    <Route path='/production/ordersearch' exact component={OrderSearch}/>,
    <Route path='/production/entry' exact component={PlanSearch}/>,
    <Route path='/production/dashboard' exact component={ProductionSummary}/>,
    <Route path='/production/josearch' exact component={JoSearch}/>,
    <Route path='/quality/entry' exact component={QualityEntry}/>,
    <Route path='/masters/customer' exact component={CustomerSearch}/>,
    <Route path='/masters/product' exact component={ProductSearch}/>,
    <Route path='/purchase/posearch' exact component={POSearch}/>,
    <Route path='/masters/approvals' exact component={ApprovalProcess}/>,
    <Route path='/documents/view' exact component={PdfView}/>,
    <Route path='/documents/viewHtml' exact component={htmlView}/>,
    <Route path='/masters/materials' exact component={MaterialSearch}/>,
    <Route path='/masters/supplier' exact component={SupplierSearch}/>,
    <Route path='/purchase/materialpr' exact component={PurchaseRequest}/>,
   // <Route path='/purchase/generatepo' exact component={GeneratePo}/>,
    <Route path='/purchase/servicepr' exact component={ServiceRequest}/>,
    <Route path='/purchase/prsearch' exact component={PrSearch}/>,
    <Route path='/stores/grnitems' exact component={GateSearch}/>,
    <Route path='/stores/inward' exact component={StockInward}/>,
    <Route path='/stores/materialreq' exact component={StoresMatRequest}/>,
    <Route path='/stores/itemsreq' exact component={StoresItemsRequest}/>,
    <Route path='/stores/damagegoods' exact component={DamagedGoods}/>,
    <Route path='/stores/materialsearch' exact component={MaterialSearchStores}/>,
    <Route path='/purchase/prtemplate' exact component={PrTemplate}/>,
    <Route path='/purchase/jorder' exact component={PurJorder}/>,
    <Route path='/stores/grnentry' exact component={GrnEntry}/>,   
    <Route path='/production/plan' exact component={PlanAndExecution}/>,
    <Route path='/production/melting' exact component={MeltingEntry}/>,
    <Route path='/purchase/downloadPdf' exact component={DownloadPdf}/>,
    <Route path='/production/storesRequest' exact component={MaterialRequest}/>,
    <Route path='/stores/materialreq1' exact component={StoresRequest}/>,
    <Route path='/costing/newproducts' exact component={Newproducts} />,
    <Route path='/purchase/poentry' exact component={PoEntry} />,
    <Route path='/purchase/ServicePoEntry' exact component={ServicePoEntry}/>,
    <Route path='/masters/defects' exact component={DefectSearch}/>,
    <Route path='/quality/entrySearch' exact component={InsEntrySearch}/>,
   
];       