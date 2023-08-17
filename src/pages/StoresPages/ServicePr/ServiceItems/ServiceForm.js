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

function ServiceForm(props) {

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
   <Row style={{backgroundColor:"darkgrey",borderRadius:"1em",paddingBottom:"1em"}}>
   <Col md={{span:4,offset:1}}>
       <Form.Group key="deliveryDate">
                                <Form.Label htmlFor="deliveryDate">Service Date</Form.Label>
                                <Form.Control type="date" id="deliveryDate" name="deliveryDate"  
                                {...register("deliveryDate",{ required: "Enter Delivery Date" })} />
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
       <Col md={5}>
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Service Description</Form.Label>
                            <Form.Control as="textarea" id="quantity" name="quantity"
                            {...register("quantity",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty}/>
                            {errors["quantity"] && ((
                        <Form.Text className="text-danger" >
                        {errors["quantity"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>       
       <Col md={1}> <a style={{paddingTop:"1em"}}><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
   </Row>
   </Form>
  )
}

export default ServiceForm
