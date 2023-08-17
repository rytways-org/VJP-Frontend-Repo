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
import classes from '../../../Components/Forms/CreateForm.module.css'
import {FcPlus} from 'react-icons/fc'
import Ctheme from "../../../Components/Ctheme/Ctheme";

function RejectionForm(props) {

    const [defValues,setDefValues] = useState();
    const [rejections,setRejections]=useState(props.rejections)
    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue,reset} = useForm( {defaultValues: {...defValues}});
    const addRejections= (values)=>{
        props.saveRejections(values);
        reset()
    }

    useEffect(() => {
      reset(props.defaultValues)
    }, [props.defaultValues])
  return (
    <Form className={classes.formcon}>
   <Row style={{backgroundColor:Ctheme.colors.dgc,borderRadius:"1em",}}>
   <Col >
       <Form.Group key="defectId">
                            <Form.Label htmlFor="defectId">Defect Types</Form.Label>
                            <Form.Select id="defectId"  name="defectId" {...register("defectId",{ required: "Defect Must Be Selected" })} 
                            className={classes.formBorder}>
                            {props.defects.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </Form.Select>
                            {errors["defectId"] && ((
                        <Form.Text className="text-danger" >
                        {errors["defectId"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col >
       <Form.Group key="rejectQty">
                            <Form.Label htmlFor="rejectQty">Rejected Qty</Form.Label>
                            <Form.Control type="text" id="rejectQty" name="rejectQty"
                            {...register("rejectQty",{ required: "Rejection Quantity is Required" })}
                            className={classes.formBorder}/>
                            {errors["rejectQty"] && ((
                        <Form.Text className="text-danger">
                        {errors["rejectQty"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col >
       <Form.Group key="rejectedSerialNo">
                                <Form.Label htmlFor="rejectSerielNo">Reject SerialNo</Form.Label>
                                <Form.Control type="text" id="rejectedSerialNo" name="rejectedSerialNo"  
                                {...register("rejectedSerialNo",{ required: "Enter Rejected Seriel No" })}
                                className={classes.formBorder} />
                                {errors["rejectedSerialNo"] && ((
                            <Form.Text className="text-danger">
                            {errors["rejectedSerialNo"]['message']}
                            </Form.Text>
                         ))}
                            </Form.Group>
                            <Form.Control type="hidden" id="insEntryId" name="insEntryId"
                             {...register("insEntryId") }  value={props.insEntryId ? props.insEntryId: "" }
                             className={classes.formBorder}
                            />

                          <Form.Control type="hidden" id="rejectId" name="rejectId"
                             {...register("rejectId") }  value={props.rejections ? props.rejections.rejectId : "" }
                             className={classes.formBorder} />
       </Col>
       <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addRejections)} hover/></a></Col>
   </Row></Form>
  )
}

export default RejectionForm
