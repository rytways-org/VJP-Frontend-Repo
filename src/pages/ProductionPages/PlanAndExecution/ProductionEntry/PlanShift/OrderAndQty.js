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

function OrderAndQty(props) {

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
    
   <Row style={{backgroundColor:"darkgrey",borderRadius:"1em"}}>
   <Col md={{span:3,offset:1}}>
       <Form.Group key="order">
                            <Form.Label htmlFor="order">Product Code</Form.Label>
                            <Form.Control type="text" id="quantity" name="quantity"
                            {...register("quantity",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty}/>
                            {errors["quantity"] && ((
                        <Form.Text className="text-danger" >
                        {errors["quantity"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
      
       </Col>
       <Col md={{span:3}}>
       <Form.Group key="order">
                            <Form.Label htmlFor="order">Product</Form.Label>
                            <Form.Select id="order"   {...register("order",{ required: "Select Order" })} >
                            <option value={1} >Product 1</option>
                            <option value={1} >Product 2</option>
                            <option value={1} >Product 3</option>
                            <option value={1} >Product 4</option>
                            </Form.Select>
                            {errors["order"] && ((
                        <Form.Text className="text-danger">
                        {errors["order"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
      
       </Col>
       <Col md={3}>
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Produced Quantity</Form.Label>
                            <Form.Control type="number" id="quantity" name="quantity"
                            {...register("quantity",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty}/>
                            {errors["quantity"] && ((
                        <Form.Text className="text-danger" >
                        {errors["quantity"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3,offset:1}}>
       <Form.Group key="remarks">
                            <Form.Label htmlFor="remarks">Remarks</Form.Label>
                            <Form.Control as='textarea' id="remarks" name="quantity"
                            {...register("quantity",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty}/>
                            {errors["quantity"] && ((
                        <Form.Text className="text-danger" >
                        {errors["quantity"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
      
       <Col md={{span:1}}> <a><FcPlus size={42} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
   </Row>
   </Form>
  )
}

export default OrderAndQty
