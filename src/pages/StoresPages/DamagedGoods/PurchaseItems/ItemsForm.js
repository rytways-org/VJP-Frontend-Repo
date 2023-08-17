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

function ItemsForm(props) {

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
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Material Category</Form.Label>
                            <Form.Select id={"items"}   {...register("quantity",{ required: "Items is Required" })} >
                                <option value="Adapter" >Raw Materials</option>
                                <option value="Conector" >Office Supplies</option>
                                <option value="Pins" >Electronics</option>
                            </Form.Select>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Material Sub-Category</Form.Label>
                            <Form.Select id={"items"}   {...register("quantity",{ required: "Items is Required" })} >
                                <option value="Adapter" >Adapter</option>
                                <option value="Conector" >Conector</option>
                                <option value="Pins" >Pins</option>
                            </Form.Select>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Material Name</Form.Label>
                            <Form.Select id={"items"}   {...register("quantity",{ required: "Items is Required" })} >
                                <option value="Adapter" >Adapter</option>
                                <option value="Conector" >Conector</option>
                                <option value="Pins" >Pins</option>
                            </Form.Select>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3,offset:1}}>
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Quantity</Form.Label>
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
       <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
   </Row></Form>
  )
}

export default ItemsForm
