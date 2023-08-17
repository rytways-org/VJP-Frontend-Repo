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

function POItemsForm(props) {

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
       <Col md={{span:3}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Material</Form.Label>
                            <Form.Select type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}>
                              <option value="" >Select</option>
                              <option value="" >Mat1</option>
                              <option value="" >Mat13</option>
                              <option value="" >Mat45</option>
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
                            <Form.Label htmlFor="lineNo">HSN/SAC Code</Form.Label>
                            <Form.Control type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}/>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Unit Price</Form.Label>
                            <Form.Control type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}/>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3}}>
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
       <Col md={{span:3}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">GST Percentage</Form.Label>
                            <Form.Control type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}/>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:3}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Cost Center</Form.Label>
                            <Form.Select type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}>
                              <option>Select</option>
                              <option>Cost Center 1</option>
                              <option>Cost Center 2</option>
                              <option>Cost Center 3</option>
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
                            <Form.Label htmlFor="lineNo">Amount</Form.Label>
                            <Form.Control type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}/>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
   </Row></Form>
  )
}

export default POItemsForm
