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

function PoFooter(props) {

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
                            <Form.Label htmlFor="lineNo">Gross Amount</Form.Label>
                            <Form.Control type="textarea" id="lineNo" name="lineNo"
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
                            <Form.Label htmlFor="lineNo">Gst Amount</Form.Label>
                            <Form.Control type="textarea" id="lineNo" name="lineNo"
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
                            <Form.Label htmlFor="lineNo">Net Amount</Form.Label>
                            <Form.Control type="textarea" id="lineNo" name="lineNo"
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
                            <Form.Label htmlFor="lineNo">Terms And Conditions</Form.Label>
                           <Form.Control as="textarea" id="lineNo" name="lineNo"
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
                            <Form.Label htmlFor="lineNo">General Terms</Form.Label>
                            <Form.Select type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}>
                              <option>Select</option>
                              <option>Terms and Conditions 1</option>
                              <option>Terms and Conditions 2</option>
                              <option>Terms and Conditions 3</option>
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
                            <Form.Label htmlFor="lineNo">Special Terms</Form.Label>
                            <Form.Select type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })}>
                              <option>Select</option>
                              <option>Terms and Conditions 1</option>
                              <option>Terms and Conditions 2</option>
                              <option>Terms and Conditions 3</option>
                            </Form.Select>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
   </Row></Form>
  )
}

export default PoFooter
