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

function CostCenter(props) {

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

   <span>Consumed For Purpose/ Cost Center</span>
    <Col md={{span:3,offset:1}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Major</Form.Label>
                            <Form.Select id={"items"}   {...register("quantity",{ required: "Items is Required" })} >
                            <option value="Adapter"> Select</option>
                                <option value="Adapter" >Production</option>
                                <option value="Conector" >Finance</option>
                                <option value="Pins" >Admininstration</option>
                                <option value="Pins" >General</option>
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
                            <Form.Label htmlFor="lineNo">Minor</Form.Label>
                            <Form.Select id={"items"}   {...register("quantity",{ required: "Items is Required" })} >
                            <option value="Adapter" >Select</option>
                                <option value="Adapter" >Foundry</option>
                                <option value="Conector" >Machining</option>
                                <option value="Pins" >Quality</option>
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
                            <Form.Label htmlFor="lineNo">Micro</Form.Label>
                            <Form.Select id={"items"}   {...register("quantity",{ required: "Items is Required" })} >
                            <option value="Adapter" >Select</option>
                                <option value="Adapter" >Machine 1</option>
                                <option value="Conector" >Machine 2</option>
                                <option value="Pins" >Process 4</option>
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

export default CostCenter
