import React, { useState, useCallback, useEffect } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import { Row, Col, Card } from "react-bootstrap";
import classes from "./dailyentry.module.css";
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import QualityTable from "./QualityTable";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Table from "../../../../Components/tables/Table";

function QualityForm(props) {
  let rowWiseFields = 3;
  const dispatch = useDispatch();
  const [defValues, setDefValues] = useState({});
  const [loadState, setLoadState] = useState(Math.random());
  const [defects,setDefects] =useState([{"value":"","label":"Select"}]);
  const [process,setProcess]=useState([]);

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  let [oldEntry, setOldEntry] = useState();
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/inspectionEntry/latestEntry", {
      orderId: props.orderId,
      prodProcMapId: props.selectedItem.prodProcMapId,
      loadState: loadState,
    });
    const loadedProcess = await post(api+"/ppMap/loadOptionsBefore",{id:props.selectedItem.prodProcMapId})
    setProcess([...[{"value":"","label":"Select"}],...loadedProcess])
    console.log(intialdata)
    //console.log(props.selectedItem.prodProcMapId)

    if (response.ok && intialdata.retValues.latestEntries)
      setOldEntry([intialdata.retValues.latestEntries]);
    setStockDisplay((oldStock) => ({
      ...oldStock,
      stock: intialdata.retValues.prodStock.stockQuantity ? intialdata.retValues.prodStock.stockQuantity : 0,
      produced: intialdata.retValues.prodStock._producedQuantity ? intialdata.retValues.prodStock._producedQuantity : 0,
    }));
  }, [post,response]);
   const saveDetails = async (entry) => {
    //  procMaps
    const insEntryapi = entry.insEntryId
      ? "/inspectionEntry/update"
      : "/inspectionEntry/create";
    console.log(insEntryapi);
    const returnObject = await post(api + insEntryapi, entry);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.insEntryId) {
        setOldEntry([returnObject.retValues.insEntry]);
        setLoadState(Math.random());
        AlertHandler(returnObject.retValues.message, "success");
      } else if (returnObject.retValues.insEntry.insEntryId > 0) {
        setOldEntry([returnObject.retValues.insEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random());
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const searchQuality=()=>{
    
  }

  useEffect(() => {
    loadInitialData();
  }, [loadState]); // componentDidMount

  const [selectedEntry,setSelectedEntry] = useState();
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      setSelectedEntry(item);
    
    }
  };
  const loadInitialDefects = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadeddefects = await get(api+"/defect/loadOptions");
    setDefects([...defects,...loadeddefects]);
    console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => { loadInitialDefects() }, [])

  const form_header = (
    <>
      <Card body className={classes.title}>
        <Row>
          <Col
            style={{
              backgroundColor: "grey",
              justifyContent: "left",
              borderRadius: "5%",
            }}
            md={2}
          >
            Stock Qty <br />
            {stockDisplay.stock}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            {" "}
            <h4>
              {props.selectedItem.process.proSubCat === "Quality"
                ? "Inspection"
                : `Line Inspection ${ props.selectedItem.process.processName}`}
                {" "} - {props.productName}
            </h4>{" "}
          </Col>
        </Row>
      </Card>
    </>
  );
  //<Col style={{backgroundColor:"grey",justifyContent:'right',borderRadius:"5%"}} md={{ span: 2, offset: 1}}>Completed Qty <br/>{stockDisplay.produced}</Col>

  let template = {
    fields: [
      {
        title: "Date",
        type: "date",
        name: "entryDate",
        contains: "date",
        validation: "Date is Required",
        inpprops: {
          format: "dd/mm/yy",
        },
      },
      {
        title: "Shift",
        type: "select",
        name: "shift",
        validationProps: "Please select Shift",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Shift_1", label: "Shift 1" },
          { value: "Shift_2", label: "Shift 2" },
          { value: "Shift_3", label: "Shift 3" },
        ],
      },
      {
        title: "Inspected Qty",
        type: "number",
        name: "insQuantity",
        contains: "number",
        inpprops: {
          min: 1,
          step: 1,
          max :stockDisplay.stock
        },
      },{
        title: "Rework Qty",
        type: "number",
        name: "reworkQuantity",
        contains: "number",
        inpprops: {
          min: 0,
          step: 1,
        },
      },
      {
        title: "Rework Serial No",
        type: "textarea",
        name: "reworkSerialNo",
        contains: "textarea",
        inpprops: {
          maxlength: 255,
          md: 4,
        },
      },
      {
        title: "Rework Process",
        type: "select",
        name: "reworkMapId",
        validationProps: "Please select Process",
        contains: "Select",
        options: process,
      },
      {
        title: "Remarks",
        type: "textarea",
        name: "remarks",
        contains: "textarea",
        inpprops: {
          maxlength: 128,
          md: 4,
        },
      },
      {
        title: "Rejected Qty",
        type: "number",
        name: "rejectedQuantity",
        contains: "number",
        inpprops: {
          min: 0,
          step: 1,
        },
      },
      {
        title: "Defect Type",
        type: "select",
        name: "defectId",
        contains: "Select",
        options: defects,
      },
      {
        title: "Rejected Serial No",
        type: "textarea",
        name: "rejectedSerialNo",
        contains: "textarea",
        inpprops: {
          maxlength: 255,
          md: 4,
        },
      },
      
      
      {
        type: "hidden",
        name: "orderId",
        contains: "number",
        value: props.orderId,
      },
      {
        type: "hidden",
        name: "prodProcMapId",
        contains: "number",
        value: props.selectedItem.prodProcMapId,
      },
      {
        type: "hidden",
        name: "lineInspection",
        contains: "number",
        value:
          props.selectedItem.process.proSubCat === "Quality" ? "No" : "Yes",
      }, {
        type: "hidden",
        name: "isReworkEntry",
        contains: "number",
        value:"No",
         },
    ],
  };

  function onSubmit(values) {
    saveDetails(values);
  }

  return (
    <>
      {form_header}
      <CreateForm
        template={template}
        watchFields={["firstname"]}
        rowwise={rowWiseFields}
        validate={validate}
        onSubmit={onSubmit}
        onCancel={props.onCancel}
        buttonName="Add"
        defaultValues={selectedEntry}
      ></CreateForm>

      <SimpleCard>
        {<Table cols={QualityTable(handleEdit)} data={oldEntry}></Table>}
      </SimpleCard>
    </>
  );
}

function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;

  // Firstname validation
  if (watchValues["firstname"] === "Admin") {
    if (!errors["firstname"]) {
      setError("firstname", {
        type: "manual",
        message: "You cannot use this first name",
      });
    }
  } else {
    if (errors["firstname"] && errors["firstname"]["type"] === "manual") {
      clearErrors("firstname");
    }
  }
}

export default QualityForm;
