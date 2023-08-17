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
import classes from '../../../../Components/Forms/CreateForm.module.css'
import {FcPlus} from 'react-icons/fc'
import Ctheme from "../../../../Components/Ctheme/Ctheme";

function DeliveryForm(props) {

    const [defValues,setDefValues] = useState();
    const [deliveries,setDeliveries]=useState(props.deliveries)
    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue,reset} = useForm( {defaultValues: {...defValues}});
    const addDeliveries = (values)=>{
        props.saveDeliveries(values);
        reset()
    }

    useEffect(() => {
      reset(props.defaultValues)
    }, [props.defaultValues])
  return (
    <Form className={classes.formcon}>
   <Row style={{backgroundColor: Ctheme.colors.dgc,borderRadius:"1em", padding:Ctheme.paddings.pdc,}}>
       <Col>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Line No</Form.Label>
                            <Form.Control type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })} className={classes.formBorder}/>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col>
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Quantity</Form.Label>
                            <Form.Control type="number" id="quantity" name="quantity"
                            {...register("quantity",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty} className={classes.formBorder}/>
                            {errors["quantity"] && ((
                        <Form.Text className="text-danger" >
                        {errors["quantity"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col >
       <Form.Group key="deliveryDate">
                                <Form.Label htmlFor="deliveryDate">Delivery Date</Form.Label>
                                <Form.Control type="date" id="deliveryDate" name="deliveryDate"  
                                {...register("deliveryDate",{ required: "Enter Delivery Date" })} className={classes.formBorder}/>
                                {errors["deliveryDate"] && ((
                            <Form.Text className="text-danger">
                            {errors["deliveryDate"]['message']}
                            </Form.Text>
                         ))}
                            </Form.Group>
                            <Form.Control type="hidden" id="orderId" name="orderId"
                             {...register("orderId") }  value={props.orderId ? props.orderId : "" }
                            />

                          <Form.Control type="hidden" id="deliveryId" name="deliveryId"
                             {...register("deliveryId") }  value={props.delivery ? props.delivery.deliveryId : "" }
                            />
       </Col>
       <Col className="d-flex align-items-center justify-content-center"> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
   </Row></Form>
  )
}

export default DeliveryForm
