import React,{useCallback,useEffect,useReducer,useState} from 'react'
import CreateForm from '../../../../Components/Forms/CreateForm'
import api from "../../../../Api";
import { useSelector, useDispatch } from "react-redux";
import useFetch, { Provider } from "use-http";
import { alertActions } from "../../../../store/alert-slice";
import { OutwardTable } from './OutwardTable';
import Table from "../../../../Components/tables/Table";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Col, Row, Card } from "react-bootstrap";
import classes from "../../ProductionEntry/productionentry.module.css";
import Ctheme from '../../../../Components/Ctheme/Ctheme';



const styles = { 
 
 
  upperRow: {
    margin: Ctheme.margins.mg,
    padding: Ctheme.paddings.pd,
    
  },
};

const rowWiseFields=2
function OutwardForm(props) {

  
       const dispatch = useDispatch();
       const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
         state.alertProps.showAlert,
         state.alertProps.alertMessage,
         state.alertProps.alertVariant,
       ]);
      var [maxQty,setMaxQty] = useState(props.selected.approvedQty - props.selected.sentQty)
       const [stockDisplay, setStockDisplay] = useState({ stock: 0, produced: 0 });
       const { get, post, response, loading, error } = useFetch({ data: [] });
       let [oldEntry, setOldEntry] = useState([]);
       const [loadState, setLoadState] = useState(Math.random());
       const handleLoadChange = (action) => {
         setLoadState(Math.random());
         // dispatch(orderEntryActions.);
       };
       const saveDetails = async (entry) => {
         //  procMaps
         const prodEntryapi = entry.joTransId ? "/joTrans/update" : "/joTrans/create";
         console.log(prodEntryapi);
         
         const returnObject = await post(api + prodEntryapi, entry);
         if (returnObject.retValues.status == 1) {
           if (entry.joTransId) {
             setOldEntry(
               oldEntry.map((odr) =>
                 odr.joTransId=== returnObject.retValues.order.joTransId
                   ? returnObject.retValues.order
                   : odr
               )
             );
            // setOldEntry([...returnObject.retValues.order,...oldEntry]);
             AlertHandler(returnObject.retValues.message, "success");
             setLoadState(Math.random());
             props.loadStateContoller()
             console.log(loadState);
           } else if (returnObject.retValues.order.joTransId > 0) {
             setOldEntry([returnObject.retValues.order, ...oldEntry]);
             setOldEntry([...returnObject.retValues.order,...oldEntry]);
             AlertHandler(returnObject.retValues.message, "success");
             setLoadState(Math.random());
             props.loadStateContoller()
             console.log(loadState);
           }
         } else {
           AlertHandler(returnObject.retValues.message, "danger");
         }
       };
     
       const loadInitialData = useCallback(async () => {
         const intialdata = await post(api + "/joTrans/listJoTrans", {
          jOrder: props.selected,
           loadStateid: Date().toString(),
         });
         console.log({ ...intialdata });
         if (response.ok) {
          setOldEntry(intialdata.retValues.latestEntries);
          setStockDisplay((oldStock) => ({
            ...oldStock,
            stock: intialdata.retValues.prodStock?.stockQuantity, 
          }));
          intialdata.retValues.prodStock?.stockQuantity < maxQty && setMaxQty(intialdata.retValues.prodStock?.stockQuantity) 
          }
       }, [post, response,loadState]);
     
       useEffect(() => {
         loadInitialData();
       }, [loadInitialData]); // componentDidMount
     
       const form_header = (
        <>
          <Card body className={classes.title} style={{
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
                Available Qty <br /> {stockDisplay.stock}
              </Col>
              <Col md={{ span: 6, offset: 2 }}>
          {" "}
          <h4>Job Order Outward Details</h4>{" "}
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
                Received Qty
                <br /> {props.selected.sentQty}
              </Col>
            </Row>
          </Card>
        </>
      );

       const AlertHandler = (alertContent, alertType) => {
         dispatch(
           alertActions.showAlertHandler({
             showAlert: !showAlert,
             alertMessage: alertContent,
             alertVariant: alertType,
           })
         );
       };

  const [selectedEntry,setSelectedEntry] = useState({});
  const handleEdit = (item, action) => () => {
    if (action === "edit") {
      setSelectedEntry({...item});
    
    }
  };

  const template = {
   
     fields: [
          {
              title: 'Date',
              type: 'date',
              name: 'entryDate',
              contains:"date",
              validation:"Date is Required",
              inpprops:{
                format:"mm/yy"
              },   
        }, 
       
        {
         title: 'Dc No',
         type: 'text',
         name: 'dcNo',
         contains: 'text',
         validationProps: "Vechicle No is required",
         inpprops:{
             minlength:8,
             maxlength:80
         }
     }, {
       title: 'Vechicle Details',
       type: 'text',
       name: 'vechicleDetails',
       contains: 'text',
       validationProps: "Vechicle No is required",
       inpprops:{
           minlength:8,
           maxlength:80
       }
   },{
     title: 'Quantity',
     type: 'number',
     name: 'quantity',
     contains: 'number',
     validationProps: "Target Days is required",
     inpprops:{
         min:1,
         max:maxQty
     }
 },
   {
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
 value:"Yes",
 inpprops:{
   maxlength:128,
   md:6
 },
},
        ]
    }


  function onSubmit(values) {
    console.log(values);
    saveDetails(values);
  }
  
   
  return (
    <>
    {form_header}
    <CreateForm  
    template={template} 
    rowwise={rowWiseFields}
    validate={validate}
    onSubmit={onSubmit} 
    onCancel={props.onCancel}
    buttonName={"Save"}
    defaultValues={selectedEntry}
    styles={styles}>
     </CreateForm>
     <SimpleCard md={12}>
        <Table
          cols={OutwardTable(handleEdit, [])}
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
  

  export default OutwardForm