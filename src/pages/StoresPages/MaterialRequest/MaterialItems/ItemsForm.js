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

function ItemsForm(props) {

    const [defValues,setDefValues] = useState();
    const [prItems,setPrItems]=useState(props.prItems)
    const[mats,setMats] = useState(props.materials)
    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue,reset} = useForm( {defaultValues: {...defValues}});
    const addPrItems = (values)=>{
      console.log(values)
      values.approvedQty = values.reqQty
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
   <Row style={{backgroundColor:"darkgrey",borderRadius:"1em"}}>
    <Col md={{span:4}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Material Category</Form.Label>
                            <Form.Select 
                            id={"category"} name="category"
                            {...register("category",{ required: "Items is Required" })} >
                                <option value="Raw_Materials" >Raw Materials</option>
                                <option value="Office_Supplies" >Office Supplies</option>
                                <option value="Electronics" >Electronics</option>
                            </Form.Select>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:4}}>
       <Form.Group key="lineNo">
                            <Form.Label htmlFor="lineNo">Material Name</Form.Label>
                            <Form.Select id={"items"}  
                             {...register("materialId",{ required: "Items is Required" })} 
                             onChange={e=>{props.materialChange(e.target.value)}}>
                            {props.materials.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </Form.Select>
                            {errors["lineNo"] && ((
                        <Form.Text className="text-danger">
                        {errors["lineNo"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       <Col md={{span:4}}>
       <Form.Group key="uom">
                            <Form.Label htmlFor="uom">Uom</Form.Label>
                            <Form.Control type="text" id="uom" name="uom" value={props.uom}
                            {...register("uom",{ required: "Quantity is Required" })}
                            diabled readOnly />
                        </Form.Group>
       </Col>
       <Col md={4}>
       <Form.Group key="quantity">
                            <Form.Label htmlFor="quantity">Quantity</Form.Label>
                            <Form.Control type="reqQty" id="reqQty" name="reqQty"
                            {...register("reqQty",{ required: "Quantity is Required" })}
                            min={1} step={1} max={props.maxQty}/>
                            {errors["reqQty"] && ((
                        <Form.Text className="text-danger" >
                        {errors["reqQty"]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group>
       </Col>
       
       <Col md={1}> <a><FcPlus size={38} className={classes.btnextra} onClick={handleSubmit(addPrItems)} hover/></a></Col>
   </Row></Form>
  )
}

export default ItemsForm
