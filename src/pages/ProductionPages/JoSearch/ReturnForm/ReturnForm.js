import React , {useState,useCallback,useEffect} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import { ReturnTable } from './ReturnTable';
import Table from "../../../../Components/tables/Table";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import api from "../../../../Api";
import { Col, Row, Card } from "react-bootstrap";
import classes from "../../ProductionEntry/productionentry.module.css";
import Ctheme from '../../../../Components/Ctheme/Ctheme';

const styles = {
  upper: {
    
    padding: "0",
    margin: "0",
    borderRadius: '0px'
  },
  upperRow: {
    margin: "1rem",
    padding:'0'
  },
  uppertitle: {
    borderRadius:'0px'
  }
};

const stylesUpper = {
  margin: "1rem",
  padding: "0",

};

const stylesUpperTwo = {
  margin: "1rem",
  
  /*backgroundColor:'yellow' */
};
function ReturnForm(props) {
  let rowWiseFields = 2;
  const [selectedEntry,setSelectedEntry] = useState();

const handleEdit = (item, action) => () => {
  if (action === "edit") {
    setSelectedEntry({...item});
  
  }
};
const dispatch = useDispatch();
const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
  state.alertProps.showAlert,
  state.alertProps.alertMessage,
  state.alertProps.alertVariant,
]);

const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
var [maxQty,setMaxQty] = useState(props.selected.sentQty - props.selected.receivedQty)
const { get, post, response, loading, error } = useFetch({ data: [] });
let [oldEntry, setOldEntry] = useState([]);
const [loadState, setLoadState] = useState(Math.random());
const handleLoadChange = (action) => {
  setLoadState(Math.random());
  // dispatch(orderEntryActions.);
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
  const prodEntryapi = entry.joTransId ? "/joTrans/update" : "/joTrans/create";
  const returnObject = await post(api + prodEntryapi, entry);
  console.log(returnObject);
  if (returnObject.retValues.status == 1) {
    if (entry.joTransId) {
      setOldEntry(
        oldEntry.map((odr) =>
          odr.joTransId === returnObject.retValues.order.joTransId
            ? returnObject.retValues.order
            : odr
        )
      );
    //  setOldEntry([...returnObject.retValues.order,...oldEntry]);
      AlertHandler(returnObject.retValues.message, "success");
      setLoadState(Math.random());
      console.log(loadState);
    } else if (returnObject.retValues.order.joTransId > 0) {
     // setOldEntry([returnObject.retValues.order, ...oldEntry]);
      setOldEntry([returnObject.retValues.order,...oldEntry]);
      AlertHandler(returnObject.retValues.message, "success");
      setLoadState(Math.random());
      console.log(loadState);
    }
  } else {
    AlertHandler(returnObject.retValues.message, "danger");
  }
};


const loadInitialData = useCallback(async () => {
  console.log(props.selected.joId)
  const intialdata = await post(api + "/joTrans/listJoTransInwards", {
    jOrder: props.selected,
    loadStateid: Date().toString(),
  });
  console.log({ ...intialdata });
  if (response.ok){
    setOldEntry(intialdata.retValues.latestEntries);
    setStockDisplay((oldStock) => ({
      ...oldStock,
      stock: intialdata.retValues.prodStock.joStockQuantity, 
    }));
  } 
}, [post, response,loadState]);

useEffect(() => {
  loadInitialData();
}, [loadInitialData]); // componentDidMount

const form_header = (
  <>
    <Card body className={classes.title}  style={{
                  backgroundColor: Ctheme.colors.ttle,
                 
                  
                }}>
      <Row>
      <Col
                style={{
                  backgroundColor: Ctheme.colors.yllw,
                  justifyContent: "left",
                  borderRadius: "5%",
                  color:Ctheme.colors.blk,
                }}
                md={2}
              >
          Received Qty <br /> {props.selected.receivedQty}
        </Col>
        <Col md={{ span: 6, offset: 2 }}>
          {" "}
          <h4>Job Order Return Details</h4>{" "}
        </Col>
        <Col
                style={{
                  backgroundColor: Ctheme.colors.yllw,
                  justifyContent: "right",
                  borderRadius: "5%",
                  color:Ctheme.colors.blk,
                }}
                md={{ span: 2, offset: 0 }}
              >
          Sent Qty
          <br /> {props.selected.sentQty}
        </Col>
      </Row>
    </Card>
  </>
);

function onSubmit(values) {
  console.log(values);
  saveDetails(values);
}

let template = {
  
  fields: [
    {
      title: 'Date',
      type: 'date',
      name: 'entryDate',
      contains: 'date',
      inpprops:{
         format:"dd/mm/yyyy"
      }
  },{
    title: 'Vechicle Details',
    type: 'text',
    name: 'vechicleDetails',
    contains: 'text',
    validationProps: "Vechicle No is required",
    inpprops:{
        minlength:8,
        maxlength:80
    }
},
      {
          title: 'Received Qty',
          type: 'number',
          name: 'quantity',
          contains: 'number',
          inpprops:{
              min:1,
              step:1,
              max:maxQty
          }
      }, {
          title: 'Remarks',
          type: 'textarea',
          name: 'remarks',
          contains:"textarea",
          inpprops:{
            maxlength:128,
            md:6
          },
    },{
      type: 'hidden',
      name: 'joId',
      value:props.selected.joId,
      inpprops:{
        maxlength:128,
        md:6
      },
},{
  type: 'hidden',
  name: 'isOutwardEntry',
  value:"No",
  inpprops:{
    maxlength:128,
    md:6
  },
},
    


  ]
}
  return (
    <>
    <Card style={{border:'0'}}>
      {form_header}
    <CreateForm  template={template}
    // watchFields={['firstname','password']}
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Add"
     defaultValues={selectedEntry}
     styles={styles}
     >
     </CreateForm>
     </Card>
     <SimpleCard upper={stylesUpper} useUpperTwoStyle={false} md={12}>
        <Table
          cols={ReturnTable(handleEdit, [])}
          data={oldEntry}
          striped
        />
      </SimpleCard>
     </>
  )
}


  
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if(watchValues['firstname'] === 'Admin'){
        if(!errors['firstname']){
            setError('firstname', {
                type: 'manual',
                message: 'You cannot use this first name'
            })
        }
    }else{
        if(errors['firstname'] && errors['firstname']['type'] === 'manual'){
            clearErrors('firstname');
        }
    }
  }

export default ReturnForm