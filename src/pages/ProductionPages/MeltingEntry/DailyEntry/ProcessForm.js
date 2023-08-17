import React, { useState, useCallback, useEffect } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import { Col, Row, Card } from "react-bootstrap";
import classes from "./dailyentry.module.css";
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import ProcessProdTable from "./ProcessProdTable";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import Table from "../../../../Components/tables/Table";

function ProcessForm(props) {
  let rowWiseFields = 3;
  const dispatch = useDispatch();
  const [defValues, setDefValues] = useState({});
  const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
  const [loadState,setLoadState] = useState(Math.random());
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const { get, post, response, loading, error } = useFetch({ data: [] });

  let [oldEntry, setOldEntry] = useState();
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
            Available Qty <br /> {stockDisplay.stock}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            {" "}
            <h4>{`${props.selectedItem.process.processName} -`} {props.productName}</h4>{" "}
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

  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/productionEntry/latestEntry", {
      orderId: props.orderId,
      prodProcMapId: props.selectedItem.prodProcMapId,
      loadState: loadState,
    });
    console.log(intialdata)
    if (response.ok ) {
      if(intialdata.retValues.latestEntries){
        setOldEntry([intialdata.retValues.latestEntries]);
      
      }
      setStockDisplay((oldStock) => ({
        ...oldStock,
        stock: intialdata.retValues.prodStock.stockQuantity ? intialdata.retValues.prodStock.stockQuantity : 0, 
        produced: intialdata.retValues.prodStock.producedQuantity ? intialdata.retValues.prodStock.producedQuantity : 0,
      }));
    }
  }, [post, response,loadState]);

  useEffect(() => {
    loadInitialData();
  }, [loadState]); // componentDidMount

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
      ? "/productionEntry/update"
      : "/productionEntry/create";
    console.log(prodEntryapi);
    const returnObject = await post(api + prodEntryapi, entry);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (entry.entryId) {
        setOldEntry((oldArray) => [returnObject.retValues.prodEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        props.loadStateController()
      } else if (returnObject.retValues.prodEntry.entryId > 0) {
        setOldEntry((oldArray) => [returnObject.retValues.prodEntry]);
        AlertHandler(returnObject.retValues.message, "success");
        setLoadState(Math.random())
        props.loadStateController()
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
      loadInitialData();
    }
  };

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
        title: "Production Qty",
        type: "number",
        name: "quantity",
        contains: "number",
        inpprops: {
          min: 1,
          step: 1,
          max: stockDisplay.stock
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

  function onSubmit(values) {
    saveDetails(values);
  }
  const [selectedEntry,setSelectedEntry] = useState();
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      setSelectedEntry(item);
    
    }
  };

  return (
    <>
      {form_header}
      <CreateForm
        template={template}
        // watchFields={['firstname','password']}
        rowwise={rowWiseFields}
        validate={validate}
        onSubmit={onSubmit}
        onCancel={props.onCancel}
        buttonName="Add"
        defaultValues={selectedEntry}
      ></CreateForm>
      <SimpleCard>
        <Table cols={ProcessProdTable(handleEdit)} data={oldEntry}></Table>
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

export default ProcessForm;
