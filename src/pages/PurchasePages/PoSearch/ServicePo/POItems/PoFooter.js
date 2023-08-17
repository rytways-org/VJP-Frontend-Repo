import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  // InputGroup,
  // FormControl
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import classes from "../../../../../Components/Forms/CreateForm.module.css";
import { FcPlus } from "react-icons/fc";
import Ctheme from "../../../../../Components/Ctheme/Ctheme";

function PoFooter(props) {
  const [defValues, setDefValues] = useState();
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm({ defaultValues: { ...defValues } });
  const savePo = (values) => {
    props.savePo(values);
    reset();
  };

  
  let watchValues = watch(["roundOff","notes"]);
  
  const [watching,setWatching]=useState({"roundOff":"0","notes":""})

  const setValues=(watchValues)=>{
    if(( (watchValues[0]!=watching.roundOff) || (watchValues[1]!=watching.notes))){
      setWatching((watching)=>({...watching,roundOff:watchValues[0],notes:watchValues[1]}))
     // props.saveValues(watchValues)
   }
  }

  useEffect(()=>{
   props.saveValues(watchValues)
  },[...watchValues])
    
  useEffect(() => {
    reset(props.defaultValues);
 //   props.saveValues(watchValues)
  }, [props.defaultValues]);
  return (
    <Form className={classes.formcon}>
      <Row style={{ backgroundColor: Ctheme.colors.dg, borderRadius: "1em",padding:'.5rem 1rem' }}>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">CGst Amount</Form.Label>
            <Form.Control
              type="textarea"
              id="cGst"
              name="cGst"
              defaultValue={(props.gstAmt / 2).toFixed(2)}
              {...register("cGst")} className={classes.formBorder}
            />
            {errors["cGst"] && (
              <Form.Text className="text-danger">
                {errors["cGst"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">SGst Amount</Form.Label>
            <Form.Control
              type="textarea"
              id="sGst"
              name="sGst"
              defaultValue={(props.gstAmt / 2).toFixed(2)}
              {...register("sGst")} className={classes.formBorder}
            />
            {errors["sGst"] && (
              <Form.Text className="text-danger">
                {errors["sGst"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">IGst Amount</Form.Label>
            <Form.Control
              type="textarea"
              id="iGst"
              name="iGst"
              defaultValue={props.igstAmt.toFixed(2)}
              {...register("iGst")} className={classes.formBorder}
            />
            {errors["iGst"] && (
              <Form.Text className="text-danger">
                {errors["iGst"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">Total Gst</Form.Label>
            <Form.Control
              type="textarea"
              id="totalGst"
              name="totalGst"
              defaultValue={Number(props.gstAmt + props.igstAmt).toFixed(2)}
              {...register("totalGst")} className={classes.formBorder}
            />
            {errors["totalGst"] && (
              <Form.Text className="text-danger">
                {errors["totalGst"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">Gross Amount</Form.Label>
            <Form.Control
              type="textarea"
              id="grossAmt"
              name="grossAmt"
              defaultValue={props.gross}
              {...register("grossAmt")} className={classes.formBorder}
            />
            {errors["grossAmt"] && (
              <Form.Text className="text-danger">
                {errors["grossAmt"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">Net Amount</Form.Label>
            <Form.Control
              type="textarea"
              id="netAmt"
              name="netAmt"
              defaultValue={(props.gstAmt + props.gross).toFixed(2)}
              {...register("netAmt")} className={classes.formBorder}
            />
            {errors["netAmt"] && (
              <Form.Text className="text-danger">
                {errors["netAmt"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">Round-OFF Amt</Form.Label>
            <Form.Control
              type="textarea"
              id="roundOff"
              name="roundOff"
              defaultValue={0}
              {...register("roundOff")} className={classes.formBorder}
            />
            {errors["roundOff"] && (
              <Form.Text className="text-danger">
                {errors["roundOff"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={{ span: 3}}>
          <Form.Group key="lineNo">
            <Form.Label htmlFor="lineNo">Notes</Form.Label>
            <Form.Control
              as="textarea"
              id="notes"
              name="notes"
              defaultValue=""
               {...register("notes")} className={classes.formBorder}
            />
            {errors["notes"] && (
              <Form.Text className="text-danger">
                {errors["notes"]["message"]}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        </Row>
      
    </Form>
  );
}

export default PoFooter;
