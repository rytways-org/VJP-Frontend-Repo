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

const positions = [
  { value: "Select", label: "Select" },
  { value: "Plant Manager", label: "Plant Manager" },
  { value: "Line Supervisor", label: "Line Supervisor" },
  { value: "Store Incharge", label: "Store Incharge" },
  { value: "Admin", label: "Admin" },
]

const employees = [
  { value: "Select", label: "Select" },
  { value: "Product1", label: "Karthik" },
  { value: "Product2", label: "SundarRaj" },
]

function AuthorityForm(props) {

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
   <Row style={{backgroundColor:Ctheme.colors.dgc,borderRadius:"1em",padding:'1rem'}}>
       <Col >
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Sequence No</Form.Label>
                            <Form.Control type="text" id="lineNo" name="lineNo"
                            {...register("lineNo",{ required: "Line No is Required" })} className={classes.formBorder}/>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col >
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Position</Form.Label>
                            <Form.Select id="position" name="position"  
                                {...register("position",{ required: "Select Position" })} className={classes.formBorder} >
                            {positions.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </Form.Select>
                            {errors["position"] && ((
                        <Form.Text className="text-danger" >
                        {errors["position"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col >
       <Form.Group key="deliveryDate">
                                <Form.Label htmlFor="deliveryDate">Employee</Form.Label>
                                <Form.Select id="employee" name="employee"  
                                {...register("employee")} className={classes.formBorder} >
                            {employees.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </Form.Select>
                                {errors["employee"] && ((
                            <Form.Text className="text-danger">
                            {errors["employee"]['message']}
                            </Form.Text>
                         ))}
                            </Form.Group>
                            <Form.Control type="hidden" id="orderId" name="orderId"
                             {...register("orderId") }  value={props.orderId ? props.orderId : "" }
                             className={classes.formBorder}
                            />

                          <Form.Control type="hidden" id="deliveryId" name="deliveryId"
                             {...register("deliveryId") }  value={props.delivery ? props.delivery.deliveryId : "" }
                             className={classes.formBorder}
                            />
       </Col>
       <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addDeliveries)} hover/></a></Col>
   </Row></Form>
  )
}

export default AuthorityForm
