import React,{useState,useEffect,useContext} from "react";
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
import AuthContext from '../../../../store/auth-context';
import Ctheme from "../../../../Components/Ctheme/Ctheme";

function ItemsForm(props) {

    const [defValues,setDefValues] = useState();
    const [prItems,setPrItems]=useState(props.prItems)
    const[mats,setMats] = useState(props.materials)
    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue,reset} = useForm( {defaultValues: {...defValues}});
    const addPrItems = (values)=>{
      console.log(values)
      values.materialId = 1418
      values.materialQty = values.reqQty
        props.saveprItems(values);
        reset()
    }
    const authCtx = useContext(AuthContext);


    useEffect(() => {
      reset(props.defaultValues)
    }, [props.defaultValues])

    // const loadMaterials=(category)=>()=>{
    //   if(category=='Raw_Materials'){
    //     setMats(props.materials)
    //   }else if(category==""){
    //     setMats(props.materials)
    //   }
    //   else{
    //     setMats([{ value: "", label: "Select" }])
    //   }
    // }
  return (
    <Form className={classes.formcon}>
   <Row style={{backgroundColor:Ctheme.colors.dgc,borderRadius:"1em",padding:".5rem 1rem"}}>
       <Col md={{span:5}}>
       <Form.Group key={"description"}>
                            <Form.Label htmlFor={"description"}>Service Description</Form.Label>
                            <Form.Control as={'textarea'} id={"specification"}  
                             {...register("specification",{ required: "Specification is required" })} 
                             maxLength={554} className={classes.formBorder}
                             />
                            {errors["specification"] && ((
                        <Form.Text className="text-danger">
                        {errors["specification"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={3}>
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Quantity</Form.Label>
                            <Form.Control type="reqQty" id="reqQty" name="reqQty"
                            {...register("reqQty",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty} className={classes.formBorder}/>
                            {errors["reqQty"] && ((
                        <Form.Text className="text-danger" >
                        {errors["reqQty"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={3}>
       <Form.Group key="deliveryDate">
                                <Form.Label htmlFor="deliveryDate">Service Date</Form.Label>
                                <Form.Control type="date" id="expectedDate" name="expectedDate"  
                                {...register("expectedDate",{ required: "Enter Expected Date" })} className={classes.formBorder}
                                 />
                                {errors["expectedDate"] && ((
                            <Form.Text className="text-danger">
                            {errors["expectedDate"]['message']}
                            </Form.Text>
                         ))}
                            </Form.Group>                 
       </Col>
       <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addPrItems)} hover/></a></Col>
   </Row></Form>
  )
}

export default ItemsForm
