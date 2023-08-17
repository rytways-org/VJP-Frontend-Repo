import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Form,
  Button,
  Row,
  Col
  // InputGroup,
  // FormControl
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import classes from '../../../../../Components/Forms/CreateForm.module.css'
import {FcPlus} from 'react-icons/fc'
import { alertActions } from "../../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import Ctheme from "../../../../../Components/Ctheme/Ctheme";

function POItemsForm(props) {
   const AlertHandler = (alertContent, alertType) => {
      dispatch(
        alertActions.showAlertHandler({
          showAlert: !showAlert,
          alertMessage: alertContent,
          alertVariant: alertType,
        })
      );
    };
    const dispatch = useDispatch();
    const [alreadyAvail,setAlreadyAvail] = useState({});
    const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
      state.alertProps.showAlert,
      state.alertProps.alertMessage,
      state.alertProps.alertVariant,
    ]);
    const [defValues,setDefValues] = useState();
    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue,reset} = useForm( {defaultValues: {...defValues}});
    const addDeliveries = (values)=>{
        values.gst = 18
        values.materialRequestId = (Math.random()*10000).toFixed(0)
        values.material = {materialName: values.itemName}
        values.requests = 1;
        values.isRequest='No'
        values.requestItems = []
        values.poQty =values.quantity
        values.uom = "Nos"
        values.specs = ""
        values.amount = values.unitPrice * values.quantity;
        values.gstAmt = (
         values.unitPrice *
         values.poQty *
         0.01 *
         values.gst
       ).toFixed(2);
        props.savePo(values,"add");
        console.log(values)
        reset()
    }

    useEffect(() => {
      reset(props.defaultValues)
    }, [props.defaultValues])
  return (
    <Form className={classes.formcon}>
    <Row style={{backgroundColor:Ctheme.colors.dgc,borderRadius:"1em", padding:'.5rem 1rem'}}>
    
        <Col md={{span:3}}>
        <Form.Group key="lineNo">
                             <Form.Label htmlFor="lineNo">Unit Price</Form.Label>
                             <Form.Control type="text" id="unitPrice" name="unitPrice"
                             {...register("unitPrice")} className={classes.formBorder}
                             
                             />
                             {errors["unitPrice"] && ((
                         <Form.Text className="text-danger">
                         {errors["unitPrice"]['message']}
                         </Form.Text>
                      ))}
                         </Form.Group>
        </Col>
        <Col md={{span:3}}>
        <Form.Group key="lineNo">
                             <Form.Label htmlFor="lineNo">Cost Center</Form.Label>
                             <Form.Select type="text" id="costCenter" name="costCenter"
                             {...register("costCenter",{ required: "Line No is Required" })}
                             className={classes.formBorder}>
                               <option value="0">Select</option>
                               <option value="1">Cost Center 1</option>
                               <option value="2">Cost Center 2</option>
                               <option value="3">Cost Center 3</option>
                             </Form.Select>
                             {errors["costCenter"] && ((
                         <Form.Text className="text-danger">
                         {errors["costCenter"]['message']}
                         </Form.Text>
                      ))}
                         </Form.Group>
        </Col>
 
        <Col md={{span:3}}>
        <Form.Group key="quantity">
                             <Form.Label htmlFor="quantity">Quantity</Form.Label>
                             <Form.Control type="number" id="quantity" name="quantity"
                             {...register("quantity",{ required: "Quantity is Required" })}
                             min={1} step={1} max={props.maxQty}
                             className={classes.formBorder}/>
                             {errors["quantity"] && ((
                         <Form.Text className="text-danger" >
                         {errors["quantity"]['message']}
                         </Form.Text> 
                      ))}
                         </Form.Group> 

        </Col>
        <Col md={{span:3}}>
        <Form.Group key="quantity">
                             <Form.Label htmlFor="quantity">Due Date</Form.Label>
                             <Form.Control type="date" id="dueDate" name="dueDate"
                             {...register("dueDate")}
                             min={1} step={1} max={props.maxQty} className={classes.formBorder} />
                             {errors["dueDate"] && ((
                         <Form.Text className="text-danger" >
                         {errors["dueDate"]['message']}
                         </Form.Text>
                      ))}
                         </Form.Group>
        </Col>
        <Col md={{span:3}}>
    <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">Service Description</Form.Label>
            <Form.Control
              as="textarea"
              id="itemName"
              name="itemName"
              defaultValue=""
               {...register("itemName")} className={classes.formBorder}
            />
            {errors["itemName"] && (
              <Form.Text className="text-danger">
                {errors["itemName"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
    </Row></Form>
  )
}

export default POItemsForm
