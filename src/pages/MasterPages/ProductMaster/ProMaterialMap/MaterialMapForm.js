import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import SearchCard from "../../../../UI/cards/SearchCard";
import Modal from "../../../../UI/Modal/Modal";
import classes from "../orders.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Row, Col, Alert } from "react-bootstrap";
import MaterialMapTable from "./MaterialMapTable";
import Table from "../../../../Components/tables/Table";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modal-Slice";
import { alertActions } from "../../../../store/alert-slice";
import {data} from './data'

const styles = { 
  search: {
  border:'0px',
  margin:'0rem'
  
  },
  upper: {
    padding:'.5rem 1rem'
  }
  
};
const rowWiseFields = 3;

function MaterialMapForm(props) {
  const [prevMat,setPreviousMat]=useState("");
  const [intialvalues, setIntialvalues] = useState({});
  const [matMaps, setMatMaps] = useState();
  const [process, setProcess] = useState([{ value: "", label: "Select" }]);
  const [materialCode, setMaterialCode] = useState([{ value: "", label: "Select" }]);
  const [materials, setMaterials] = useState([{ value: "", label: "Select" }]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [disabledValues,setDisabledValues]=useState({"materialName":"","uom":""});
  
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const [showModal, selectedForm, selectedData] = useSelector((state) => [
    state.modalProps.showModal,
    state.modalProps.selectedForm,
    state.modalProps.selectedData,
  ]);

  const dispatch = useDispatch();
  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };
  
   const loadInitialOptions = useCallback(async () => {
      // const { ok } = response // BAD, DO NOT DO THIS
    const loadedmaterials = await get(api + "/material/loadOptions");
    setMaterials([...materials, ...loadedmaterials]);
    const loadedmaterialCode = await get(api + "/material/loadMaterialCodeOptions");
    setMaterialCode([...materialCode, ...loadedmaterialCode]);
    const processMapsCode = await post(api + "/ppMap/loadOptions",{"id":props.selectedItem.productId});
    setProcess([...process, ...processMapsCode]);
    console.log({ ...props.selectedItem });
   }, [get, response]);
 
   const loadInitialdata = useCallback(async () => {
      const { ok } = response // BAD, DO NOT DO THIS
      const prodId = props.selectedItem.productId
     const loadeddata = await post(api + "/pmMap/materialMaps",{"id":props.selectedItem.productId,"loadTime":Date().toLocaleString()});
      setMatMaps(loadeddata);
     //console.log({ ...props.selectedItem.productId });
   }, [get, response]);



   const setValues = useCallback(async(materialId)=>{
    //console.log("1 times");
    const material= await post(api + "/material/getById", {
      materialId: materialId,
    });
    if (response.ok) {
      setDisabledValues(disabledValues=>({...material}));
    } else {
      setDisabledValues("Not Available");
    }
    //setProds([...prods,...loadedprods])
  }, [post, response]);
  //  const setValues = useCallback(async (materialId) => {
  //   console.log(materialId);
  //   if (materialId) {
  //     const material= await post(api + "/material/getById", {
  //       materialId: materialId,
  //     });
  //     if (response.ok) {
  //       setDisabledValues(disabledValues=>({...material}));
  //     } else {
  //       setDisabledValues("Not Available");
  //     }
  //   }
  // }, [post, response]); 


  useEffect(()=>{loadInitialdata()},[]);
   useEffect(() => {
     loadInitialOptions();
 }, [loadInitialOptions]); // componentDidMount

 const products=[]
  const saveDetails = async (materialMap) => {
   // console.log(materialMap)
   //  procMaps
   const pmmapApi = materialMap.prodMapId ? "/pmMap/update" : "/pmMap/create"
   const returnObject= await post(api + pmmapApi, materialMap);
   //console.log(returnObject)
   //console.log(returnObject.retValues.status)
    if (returnObject.retValues.status==1) {
      if (materialMap.prodMatMapId) {
         setMatMaps(
           matMaps.map((ppm) =>
           ppm.prodMatMapId=== returnObject.retValues.materialMap.prodMatMapId ? returnObject.retValues.materialMap : ppm
           )
         );
        // hideFormHandler();
        loadInitialdata()
        AlertHandler(returnObject.retValues.message, "success");
       // setIntialvalues({})
        setDisabledValues({"materialName":"","uom":""});
      } else if(returnObject.retValues.materialMap.prodMatMapId>0) {
        setMatMaps([...matMaps, returnObject.retValues.materialMap]);
       // hideFormHandler();
       loadInitialdata();
        AlertHandler(returnObject.retValues.message, "success");
       setIntialvalues({})
       setDisabledValues({"materialName":"","uom":""});
      }
    }else {
      // hideFormHandler();
      
       AlertHandler(returnObject.retValues.message, "danger");
      setIntialvalues({})
     }
  };
  const actions = ["edit"];

  const showFormHandler = (item,action) => () => {
    if (action === "edit") {
      setIntialvalues({...item});
      console.log(intialvalues)
    }
  };
  const hideFormHandler = () => {
    dispatch(
      modalActions.showModalHandler({
        selectedData: {},
        selectedForm: <></>,
        showModal: false,
      })
    );
  };

  const template = {
    fields: [
      {
        title: "Material Code",
        type: "select",
        name: "materialId",
        contains: "Select",
        options: materialCode,
      },

      {
        title: "Material Name",
        type: "disabled",
        name: "materialName",
        contains: "Select",
        value: disabledValues.materialName,
      },
      {
        title: "Process",
        type: "select",
        name: "prodProcMapId",
        contains: "Select",
        options: process,
      },
      {
        title: "Quantity",
        type: "number",
        name: "reqQuantity",
        contains: "number",
        validation: "Quantity is Required",
        inpprops: {
        },
      },     
      {
        title: "Uom",
        type: "disabled",
        name: "uom",
        contains: "test",
        value: disabledValues.uom,
      },
      {
        type: "hidden",
        name: "productId",
        contains: "number",
        value:props.selectedItem.productId
      }
    ],
  };

  function onSubmit(values) {
    saveDetails(values);
    //console.log(values);
  }
   

  const validate =()=>(watchValues, errorMethods)=> {
    let { errors, setError, clearErrors } = errorMethods;
    //console.log(watchValues);
    // Firstname validation
    if (watchValues!=prevMat) {
        console.log(watchValues[0]);
        setValues(watchValues[0]);
        setPreviousMat(watchValues[0]);
       // e.stopPropagation()
      
    }
  };
  
  return (
    <div className={classes.container}>
      <SearchCard
        title={`Process Mapping for ${props.selectedItem.productName}`}
        buttonName="Add"
        onHeaderClick={showFormHandler({}, "productForm", [0, 1, 2, 3, 4])}
        bottonShow={showModal}
        styles={styles}
       >
        {<CreateForm
          template={template}
          rowwise={rowWiseFields}
          watchFields={["materialId"]}
          validate={validate()}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Save"
          defaultValues={intialvalues}
          styles={styles}
        ></CreateForm>}
      </SearchCard>
      <SimpleCard md={12}>
      {matMaps && (
   <Table
     cols={MaterialMapTable(showFormHandler, actions)}
    data={matMaps}
    rows={10}
    striped
   />
 )}
      </SimpleCard>
    </div>
  );
}

export default MaterialMapForm;


