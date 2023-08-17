import React, { useState, useEffect, useCallback , useContext} from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import POItems from "./POItems/POItems";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";
import { Row,Button,Modal } from 'react-bootstrap'
import PurchaseRequests from "./POItems/PurchaseRequests";
import EditSpecs from './POItems/EditSpecs'
import AuthContext from '../../../../store/auth-context';
import Ctheme from "../../../../Components/Ctheme/Ctheme";
import SimpleCard from "../../../../UI/cards/SimpleCard";


const styles = {
  upper: {
    
    padding: "0rem", // Add the padding property here
  },
  upperRow: {
    margin: '.5rem .5rem 0 .5rem',
    padding: '0 1rem 0 1rem',
    backgroundColor: Ctheme.colors.dg,
    borderRadius:'1rem'
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor:Ctheme.colors.ttle,
  },
};
const rowWiseFields = 3;
const suppliers =[];
const custs = [];

function ServicePoEntry(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [requestNo,setRequestNo]= useState(props.reqNo);
  //const[rowData,setRowData]=useState({});
  const [companyId,setCompanyId]=useState(0)
  const [matReqs, setMatReqs] = useState(props.selectedItems ? props.selectedItems : []);
  const [multipleReqs,setMultipleReqs] = useState([])
  const[defaultValues,setDefaultValues]=useState(props.selected ? props.selected : {poNo:requestNo})
  const [suppliers,setSuppliers]=useState([{ value: "", label: "Select" }])
  const[terms,setTerms] = useState([{ value: "", label: "Select" }])
  const [iGst,setIGst]=useState(false)
  const[igstAmt,setIgstAmt]=useState(0)
  const[finalSubmit,setFinalSubmit]= useState({roundOff:0,notes:""});
  const [materials,setMaterials] = useState([{ value: "", label: "Select" }])
  const [company,setCompany] = useState([{ value: "", label: "Select" }])
  const [po, setPo] = useState([]);
  const [showFormParams,setShowformparams]=useState({
    showForm:false,
    selectedForm:<></>,
    selectedItem:{ id:0,
        productName: "",
        cusName: "",  
        part: "",
        quantity: "",
        cost: ""
        }
})
  

const loadInitialData = useCallback(async () => {
  // const { ok } = response // BAD, DO NOT DO THIS
  const initialOrders = await post(api + "/poMaster/listAll" ,{"id":Math.random(),"loadTime":Date().toLocaleString()});
  const loadedsuppliers = await get(api + "/supplier/loadOptions");
  const loadedCompany =await get(api + "/company/loadOptions")
  console.log(loadedCompany)
  const reqNo = await post(api + "/poMaster/loadReqNo",{"random":Math.random()});
  const currentYear = new Date().getFullYear()-2000;
  const currentMonth = new Date().getMonth()+1; 
     
  if (response.ok){
    setPo(initialOrders);  
    setSuppliers([...suppliers,...loadedsuppliers])
    setCompany([...company,...loadedCompany])
    currentMonth>=4 && setRequestNo(`${currentYear}/${currentYear+1}-0000${Number(reqNo)+1}`)
    currentMonth<4 && setRequestNo(`${currentYear-1}/${currentYear}-0000${Number(reqNo)+1}`)
  }
  
      //  console.log(initialCusts)
}, [get, response]);

useEffect(() => {
     loadInitialData();
  
}, []); // componentDidMount


const loadMultiReqs = async (multiReqIds,item) => {
  const multiReqs = await post(api + "/matrialPrItems/multipleRequests", {
    ids: multiReqIds,
  });
  if (response.ok) {
     for(var i = 0; i < multiReqs.length; i++){
      multiReqs[i].poQty = item.requestQty[i];
   }
  setMultipleReqs((prevState) => ([...multiReqs]));
  setMultipleReqs((state) => {
    console.log(state); // "React is awesome!"
    
    return state;
  });
  console.log(multipleReqs)
  }
};


  const savePo = (values,action) => {
    if(action==="add"){
      values.isRequest = 'No'
      setMatReqs(matReqs=>[...matReqs,values])
      setGross(gross+values.amount)
      if(iGst){
        setIgstAmt((Number(igstAmt)+Number(values.gstAmt)))
        setNet(igstAmt+gross)
      }else{
        setGstTotal((Number(gstTotal)+Number(values.gstAmt)))
        setNet(gstTotal+gross)
      }

    }else{
      console.log({...values})
      setMatReqs(matReqs.filter(function( obj ) {
             return obj.materialRequestId !== values.materialRequestId;
         }))
    }
  };

  
  
  const saveMatPRChanges =async(action,changedValue,mulReq,rowData)=>{
    if(action==="QuantityEdit"){
    mulReq.poQty = changedValue
  //  const loadedprods = await post(api + "/matrialPrItems/updatePoQty",mulReq);
  console.log(multipleReqs)
  setMultipleReqs((multipleReqs) =>
   multipleReqs.map((multiReq) =>
          multiReq.materialRequestId === mulReq.materialRequestId ? mulReq : multiReq
        )
      );
      console.log(multipleReqs)
      rowData.requestQty[rowData.requestItems.findIndex(materialRequestId=> materialRequestId===mulReq.materialRequestId)]=changedValue
      rowData.poQty=rowData.requestQty.map(qty=>qty).reduce((prev,next)=>Number(prev)+Number(next))
      rowData.amount = rowData.unitPrice * rowData.poQty;
      rowData.gstAmt = (
        rowData.unitPrice *
        rowData.poQty *
        0.01 *
        rowData.gst
      ).toFixed(2);
      updateItems("update",rowData)
    }
    else if(action ==="SpecsEdit") {
      rowData.specs = changedValue
      updateItems("SpecsEdit",rowData)
    }else{

    }
  }

 

  const showFormHandler = (item,action) => {
    if(action=="FurnanceForm"){
      loadMultiReqs(item.requestItems,item)
      const newState={
        showForm:true,
        selectedForm:<PurchaseRequests 
        handleEditRequests={saveMatPRChanges}
        matReqs={[...multipleReqs]}
        rowData = {item}
        onCancel={hideFormHandler}
        ></PurchaseRequests>,
        selectedItem:{...item}
    }
    setShowformparams({...showFormParams,...newState}) 
         }else if(action=="EditEntry"){
          const newState={
            showForm:true,
            selectedForm:<EditSpecs 
            handleEditRequests={saveMatPRChanges}
            rowData = {item}
            onCancel={hideFormHandler}
             ></EditSpecs>,
            selectedItem:{...item}
        }
        setShowformparams({...showFormParams,...newState})    
        }
}

const hideFormHandler=()=>{
  setShowformparams({...showFormParams,
      showForm:false,
      selectedForm:"",
      selectedItem:{...showFormParams.selectedItem,...{ id:0,
          productName: "",
          cusName: "",
          part: "",
          quantity: "",
          cost: "",
          }}
  })
 
  }

  

  const finalSubmitHandler =(values)=>{
    setFinalSubmit({...finalSubmit,roundOff:values[0],notes:values[2]})
    console.log(finalSubmit)
  }

  const [gstTotal, setGstTotal] = useState(
    matReqs.length>0
      ? matReqs
          .map((item) => item.gstAmt)
          .reduce((prev, next) => Number(prev) + Number(next))
      : 0
  );
  const [gross, setGross] = useState(
    matReqs.length>0
      ? matReqs
          .map((item) => item.amount)
          .reduce((prev, next) => Number(prev) + Number(next))
      : 0
  );
  const [net, setNet] = useState(gstTotal + gross); 
  const authCtx = useContext(AuthContext);
  let userId =authCtx.userId;
  
  const loadInitialOptions1 = useCallback(async () => {
     const loadedmaterials = await get(api + "/material/loadOptions");
    const loadedterms = await get(api + "/terms/loadOptions");
   // setSupplier([...suppliers, ...loadedsuppliers]);
    setMaterials([...materials,...loadedmaterials])
    setTerms([...terms,...loadedterms])
    // console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => {
    loadInitialOptions1();
  }, []); // componentDidMount

  function onSubmit(values) {
    values.poItems = matReqs
    values.termsAndConId =finalSubmit.termsAndConId
    values.roundOff = finalSubmit.roundOff
    values.notes = finalSubmit.notes
    values.grossAmt = gross 
    values.netAmt = gross + gstTotal
    values.gstAmt = gstTotal
    values.iGst = igstAmt
    values.cGst = gstTotal/2
    values.sGst = gstTotal/2
    values.totalGst = gstTotal+igstAmt

   // props.saveFunction(finalSubmit);
    console.log(values);
    props.saveFunction(values);
  }

  const template = {
    heading: "PO Entry",
    fields: [
      {
        title: "PO Date",
        type: "date",
        name: "poDate",
        contains: "date",
        validationProps: "Po Date is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },{
        title: "Company",
        type: "select",
        name: "companyId",
        contains: "Select",
        options: company,
      },
      {
        title: "PO Number",
        type: "disabled",
        name: "poNo",
        contains: "text",
        validationProps: "Po No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Supplier",
        type: "select",
        name: "supplierId",
        contains: "Select",
        options: suppliers,
      },{
        title: "Delivery Address",
        type: "textarea",
        name: "deliveryAddress",
        contains: "textarea",
        validationProps: "Delivery Address is required",
        inpprops: {
          md:4
        },
      },{
        title: "Payment Terms",
        type: "select",
        name: "paymentTerms",
        validationProps: "Please select Payment Terms",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "Advance_Payment", label: "Advance Payment" },
          { value: "LC", label: "LC" },
          { value: "CAD", label: "CAD" },
          { value: "Immediate_After_Delivery", label: "Immediate After Delivery" },
          { value: "Seven_Days_Credit_From_Dod", label: "7 Days Credit From DOD" },
          { value: "Fifteen_Days_Credit_From_Dod", label: "15 Days Credit From DOD" },
          { value: "Thirty_Days_Credit_From_Dod", label: "30 Days Credit From DOD" },
          { value: "FourtyFive_Days_Credit_From_Dod", label: "45 Days Credit From DOD" },
          { value: "Ninety_Days_Credit_From_Dod", label: "90 Days Credit From DOD" },
        ],
      },{
        title: "Payment Remarks",
        type: "textarea",
        name: "paymentRemarks",
        contains: "textarea",
        validationProps: "Delivery Address is required",
        inpprops: {
          md:4
        },
      },{
        title: "Delivery Terms",
        type: "select",
        name: "deliveryTerms",
        validationProps: "Please select Delivery Terms",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "DAP", label: "DAP" },
          { value: "Ex_works", label: "Ex Works" },
          { value: "CIF", label: "CIF" },
          { value: "C_And_F", label: "C&F" },
          { value: "FOB", label: "FOB" },
          { value: "DDP", label: "DDP" },
          { value: "DDU", label: "DDU" }
        ],
      },{
        type: "hidden",
         name: 'userId',
         contains:"hidden",
         value:userId,
          },
          {
            type: "hidden",
             name: 'poType',
             contains:"hidden",
             value:"Service_Purchase_Order",
              },{
                type: "hidden",
                 name: 'termsAndConId',
                 contains:"hidden",
                 value:"1",
                  },
    
    ],
  };
  
  const getGstDetails = (supplier)=>async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log("loading Products")
    let loadedprods = await post(api + "/supplier/getById",{"supplierId":supplier,"random":Math.random()} );
    console.log(loadedprods)
    if(loadedprods?.stateId!=33){
      if(igstAmt==0 && iGst == true){
      setIgstAmt(gstTotal)
      setGstTotal(0)
      }
      setIGst(true)
    }else{
      if(igstAmt>0){
        setGstTotal(igstAmt)
        setIgstAmt(0)
      }
    }
      
     
    // console.log({...props.selectedItem})
  };

 


  const updateItems = (action, item) => {
    if (action === "update") {
      setMatReqs((matReqs) =>
        matReqs.map((matReq) =>
          matReq.materialRequestId === item.materialRequestId ? item : matReq
        )
      );
      if(igstAmt==0){
        setGstTotal(
          matReqs
            .map((item) => item.gstAmt)
            .reduce((prev, next) => Number(prev) + Number(next))
        );
      }else{
        setIgstAmt(
          matReqs
            .map((item) => item.gstAmt)
            .reduce((prev, next) => Number(prev) + Number(next))
        );
      }
      setGross(
        matReqs
          .map((item) => item.amount)
          .reduce((prev, next) => Number(prev) + Number(next))
      );
      setNet((gstTotal + gross+ igstAmt).toFixed(2));
      
    } else if(action==="SpecsEdit"){
      setMatReqs((matReqs) =>
      matReqs.map((matReq) =>
        matReq.materialRequestId === item.materialRequestId ? item : matReq
      )
    );
    }
    else if(action==="delete"){
      console.log("delete")
      console.log(item)
      setMatReqs(matReqs=>(matReqs.filter(function (obj){
        return obj.materialRequestId !== item.materialRequestId
      })) 
    );
    console.log(matReqs)
    }else{

    }
  };

  //useEffect(()=>{saveDeliveries()},[])
 
  const handleEdit = (action, values, rowData)=> {
    if (action === "unitPrice") {
      console.log(rowData);
    //   setRowData(rowData=>({...rowData,unitPrice:values}))
    //   setRowData(rowData=>({...rowData,amount:values*rowData.poQty}))
    //   setRowData(rowData=>({...rowData,gstAmt:(values*rowData.poQty*.01*rowData.gst).toFixed(2)}))
      rowData.unitPrice=values;
      rowData.amount = values * rowData.poQty;
      rowData.gstAmt = (
        values *
        rowData.poQty *
        0.01 *
        rowData.gst
      ).toFixed(2);
      updateItems("update", rowData);
    } else if (action === "qty") {
      // setRowData(rowData=>({...rowData,poQty:values}))
      // setRowData(rowData=>({...rowData,amount:values*rowData.unitPrice}))
      // setRowData(rowData=>({...rowData,gstAmt:(rowData.unitPrice*values*.01*rowData.gst).toFixed(2)}))
    
      rowData.poQty = values;
      rowData.amount = rowData.unitPrice * rowData.poQty;
      rowData.gstAmt = (
        rowData.unitPrice *
        rowData.poQty *
        0.01 *
        rowData.gst
      ).toFixed(2);
      updateItems("update", rowData);
    } else {
      updateItems(action, rowData);
    }
  };

  const getDeliveryDetails = (supplier)=>async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    console.log("loading Products")
    let loadedprods = await post(api + "/company/getById",{"companyId":supplier,"random":Math.random()} );
    console.log(loadedprods)
    //setDefaultValues({})     
    //setRequestNo()
    setDefaultValues(defaultvalues=>({...defaultValues,deliveryAddress:loadedprods.companyAddress,poNo:`SPO-${loadedprods.prefixName}${requestNo}`}))
    // console.log({...props.selectedItem})
   // setCompanyId(Number(supplier))
    
  };


  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
    console.log('logged')
   if(watchValues[0]!="" && watchValues[0]){
    console.log(watchValues[0])
    getGstDetails(watchValues[0])()
   }else if(watchValues[1]!=undefined && (Number(watchValues[1])!=companyId)){
    console.log(watchValues[1])
    setCompanyId(Number(watchValues[1]))
    //setDefaultValues(defaultValues=>({...defaultValues,poNo:requestNo}))
    getDeliveryDetails(watchValues[1])()
    
    //
   // 
   }
  }
   
  return (
    <>
   { <Modal size="xl" show={showFormParams.showForm} onHide={hideFormHandler} >
        <Modal.Header closeButton >
          <Modal.Title style={{textAlign:"center"}}>Enter Po Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showFormParams.selectedForm}</Modal.Body>
      </Modal>}
      <SimpleCard>
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["supplierId","companyId"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      defaultValues={defaultValues}
      buttonName="Submit"
      styles={styles}
      btButtons={<POItems
        finalSubmit = {finalSubmitHandler}
           gstAmt={gstTotal}
          gross={gross} 
          net={net}
          igstAmt ={igstAmt}
        showFormHandler = {showFormHandler}
        hideFormHandler = {hideFormHandler}
        handleEdit={handleEdit}
          materials ={materials}
          terms={terms}
          data={matReqs}
          savePo={savePo}
          updateItems = {updateItems}
        />}
    ></CreateForm>
    </SimpleCard>
    </>
  );
}




export default ServicePoEntry;


