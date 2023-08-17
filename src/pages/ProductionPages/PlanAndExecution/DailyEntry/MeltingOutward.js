import React, { useState, useCallback, useEffect } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import { Col, Row, Card } from "react-bootstrap";
import classes from "./dailyentry.module.css";
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import CastingTable from "./CastingTable";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Table from "../../../../Components/tables/Table";

function MeltingOutward(props) {
  let rowWiseFields = 3;
  const dispatch = useDispatch();
  const [defValues, setDefValues] = useState({});
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
  let [heatNo, setHeatNo] = useState("Not Available");
  let [oldEntry, setOldEntry] = useState();
  
  const [loadState,setLoadState] = useState(Math.random());
  var [maxQty,setMaxQty] = useState(props.orderQty)


  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/castingEntry/latestEntry", {
      orderId: props.orderId,
      prodProcMapId: props.selectedItem.prodProcMapId,
      loadStateid: loadState,
    });
    console.log({ ...intialdata });
    if (response.ok && intialdata.retValues.latestEntries)
      setOldEntry([intialdata.retValues.latestEntries]);
    console.log(intialdata.retValues.prodStock.producedQuantity);
    setStockDisplay((oldStock) => ({
      ...oldStock,
      stock: intialdata.retValues.prodStock.stockQuantity ? intialdata.retValues.prodStock.producedQuantity
      : 0,
      produced: intialdata.retValues.prodStock.producedQuantity
        ? intialdata.retValues.prodStock.producedQuantity
        : 0,
    }));
    setMaxQty(maxQty)
  }, [post, response,loadState]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const setHeatNumber = (furnace) => async () => {
    console.log(furnace);
    if (furnace) {
      const latestHeatNo = await post(api + "/meltEntry/getHeatNo", {
        furnace: furnace,
      });
      if (response.ok) {
        setHeatNo(latestHeatNo);
      } else {
        setHeatNo("Not Available");
      }
    }
  };

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

  const saveDetails = async (entry) => {
    //  procMaps
    const prodEntryapi = entry.entryId
      ? "/castingEntry/update"
      : "/castingEntry/create";
    console.log(prodEntryapi);
    const returnObject = await post(api + prodEntryapi, entry);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.meltingEntryId) {
        setOldEntry((oldArray) => [returnObject.retValues.prodEntry]);
        AlertHandler(returnObject.retValues.message, "success");
       setLoadState(Math.random())
       console.log(loadState)
      } else if (returnObject.retValues.prodEntry.entryId > 0) {
        setOldEntry((oldArray) => [returnObject.retValues.prodEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        console.log(loadState)
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };

  const validate = (watchValues, errorMethods) => {
    let { errors, setError, clearErrors } = errorMethods;
    // console.log(watchValues["serielNoTo"]);
    // Firstname validation
    if (watchValues[0] !== "") {
      //  console.log(watchValues[0]);
      {
        setHeatNumber(watchValues[0])();
      }
    }
  };

  function onSubmit(values) {
    console.log(values);
    saveDetails(values);
  }
  const [selectedEntry,setSelectedEntry] = useState();
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      setSelectedEntry({...item});
    
    }
  };

  let melting_header = (
    <>
      <Card body className={classes.title}>
        <Row>
          {/* <Col style={{backgroundColor:"grey"} } md={2}>Inward Stock 89</Col>*/}
          <Col md={{ span: 6, offset: 3 }}>
            {" "}
            <h4>Casting Entry - {props.productName}</h4>{" "}
          </Col>
          <Col
            style={{
              backgroundColor: "grey",
              justifyContent: "right",
              borderRadius: "5%",
            }}
            md={{ span: 2, offset: 1 }}
          >
            Produced Qty
            <br /> {stockDisplay.produced}
          </Col>
        </Row>
      </Card>
    </>
  );
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
          { value: "Shift_A", label: "Shift A" },
          { value: "Shift_B", label: "Shift B" },
          { value: "Shift_C", label: "Shift C" },
        ],
      },
      {
        title: "Furnance",
        type: "select",
        name: "furnace",
        contains: "Select",
        options: [
          { value: "", label: "Select" },
          { value: "Furnance_1", label: "Furnace 1" },
          { value: "Furnance_2", label: "Furnace 2" },
          { value: "Furnance_3", label: "Furnace 3" },
          { value: "Furnance_4", label: "Furnace 4" },
          { value: "Furnance_5", label: "Furnace 5" },
        ],
      },
      {
        title: "Heat No",
        type: "disabled",
        name: "heatNo",
        contains: "text",
        value: heatNo,
      },
      {
        title: "Production Qty",
        type: "number",
        name: "quantity",
        contains: "number",
        inpprops: {
          min: 1,
          step: 1,
          max : maxQty-stockDisplay.produced
        },
      },
      {
        title: "Serial No From",
        type: "text",
        name: "serielNofrom",
        contains: "text",
        inpprops: {
          min: 3,
          max: 50,
        },
      },
      {
        title: "Serial No To",
        type: "text",
        name: "serielNoTo",
        contains: "text",
        inpprops: {
          min: 3,
          max: 50,
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
    ],
  };
  return (
    <>
      {melting_header}
      <CreateForm
        template={template}
        watchFields={["furnace"]}
        rowwise={rowWiseFields}
        validate={validate}
        onSubmit={onSubmit}
        onCancel={props.onCancel}
        buttonName="Add"
        defaultValues={selectedEntry}
      ></CreateForm>
      <SimpleCard>
        {<Table cols={CastingTable(handleEdit)} data={oldEntry}></Table>}
      </SimpleCard>
    </>
  );
}

export default MeltingOutward;
