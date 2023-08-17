import React, { useEffect,useState,useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Form,
  Button,
  Row,
  Col,Card
  // InputGroup,
  // FormControl
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import classes from './CreateForm.module.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AuthContext from '../../store/auth-context';


const getRowwise=(array,rowWise)=>{
    let result = [],
        i = 0;
    while (i < array.length) result.push(array.slice(i, i += rowWise));
  //  i.log(result)
    return result;
}


const renderFields = (fields,rowwise,watchValues,register,errors,setValue) => {

    const mdSize=parseInt(12/rowwise);
    const groupedFields = getRowwise(fields,rowwise)
   // console.log(groupedFields)

    return groupedFields.map(rowwiseFields =>
        <Container>
            <Row>
               {
                   rowwiseFields.map(field => 
        {
            let { title, type, name, contains,validationProps, dynamic,options,inpprops,value } = field;

            let showField = dynamic ? watchValues[dynamic['field']] === dynamic['value'] : true;

            if(!showField) return null;

            switch (type) {
                case 'text':
                    return (
                      <Col md={mdSize}>  <Form.Group key={name}>
                            <Form.Label htmlFor={name}>{title}</Form.Label>
                            <Form.Control type={contains} id={name}  
                             {...register(name,{ required: validationProps })} 
                              minLength={inpprops.minlength} maxLength={inpprops.maxlength} 
                             // pattern={inpprops.pattern}
                             className={classes.formBorder} />
                            {errors[name] && ((
                        <Form.Text className="text-danger">
                        {errors[name]['message']}
                        </Form.Text>
                       
                     ))}
                        </Form.Group></Col>
                        
                    )
                    case 'disabled':
                        return (
                          <Col md={mdSize}>  <Form.Group key={name}>
                                <Form.Label htmlFor={name}>{title}</Form.Label>
                                <Form.Control type={contains} id={name}  
                                 {...register(name)} 
                                  readOnly value={value} disabled className={classes.formBorder}/>
                            </Form.Group></Col>
                           
                        )
                    case 'hidden':
                    return (
                     <Form.Group key={name}>
                      <Form.Control type="hidden" id={name}  
                             {...register(name) }  value={value ? value : ""}
                             className={classes.formBorder}  />
                        </Form.Group>
                    )
                    case 'textarea':
                    return (
                      <Col md={inpprops.md}>  <Form.Group key={name}>
                            <Form.Label htmlFor={name}>{title}</Form.Label>
                            <Form.Control as={contains} id={name}  
                             {...register(name,{ required: validationProps })} 
                             maxLength={inpprops.maxlength} className={classes.formBorder} />
                            {errors[name] && ((
                        <Form.Text className="text-danger">
                        {errors[name]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group></Col>
                    )
                    case 'number':
                       return  (
                      <Col md={mdSize}>  <Form.Group key={name}>
                            <Form.Label htmlFor={name}>{title}</Form.Label>
                            <Form.Control type={contains} id={name} 
                            min={inpprops.min ? inpprops.min : 0} step={inpprops.step ? inpprops.step : .0000001}  max={inpprops.max ?inpprops.max : 9999999}
                            {...register(name,{ required: validationProps })}
                            className={classes.formBorder}/>
                            {errors[name] && ((
                        <Form.Text className="text-danger">
                        {errors[name]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group></Col>
                    )
                    case 'date':
                        return (
                          <Col md={mdSize}>  <Form.Group key={name}>
                                <Form.Label htmlFor={name}>{title}</Form.Label>
                                <Form.Control type={contains} id={name}  
                                format={inpprops.format} 
                                {...register(name,{ required: validationProps })} className={classes.formBorder}/>
                                {errors[name] && ((
                            <Form.Text className="text-danger">
                            {errors[name]['message']}
                            </Form.Text>
                         ))}
                            </Form.Group></Col>
                        )
                    case 'select':
                        return (
                            <Col md={mdSize}>  <Form.Group key={name}>
                            <Form.Label htmlFor={name}>{title}</Form.Label>
                            <Form.Select id={name}   {...register(name,{ required: validationProps })} className={classes.formBorder}>
                            {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </Form.Select>
                            {errors[name] && ((
                        <Form.Text className="text-danger">
                        {errors[name]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group></Col>
                    )
                    case 'Document':
                        return (
                            <Col md={mdSize}>  <Form.Group key={name}>
                            <Form.Label htmlFor={name}>{title}</Form.Label>
                            <Form.Control type="file" id={name}  
                                format={inpprops.format} 
                                {...register(name,{ required: validationProps })} className={classes.formBorder} />
                            {errors[name] && ((
                        <Form.Text className="text-danger">
                        {errors[name]['message']}
                        </Form.Text>
                     ))}
                        </Form.Group></Col>
                    )
                case 'checkbox':
                    return (
                        <div key={name} >
                            <label>
                                <input type="checkbox"  id={name} {...register(name,{ required: validationProps })} className={classes.formBorder} />
                                <span>{title}</span>
                                {errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                            </label>
                        </div>
                    )
                default:
                    return (
                        <div key={name}>
                            <span className="red-text">Invalid Field</span>
                        </div>
                    )
            }


        })
               } 
            </Row>
        </Container>
     
        )
}



function CreateForm({ template,watchFields,rowwise,validate, onSubmit,onCancel,buttonName,btButtons,defaultValues,styles}) {
  // useEffect(() => { console.log({...values}) }, []) 
   // const defValues = defaultValues;

    //const [defValues,setDefValues] = useState(defaultValues);

    const authCtx = useContext(AuthContext);
  //  let userId =authCtx.userId;

    let { register, handleSubmit, formState:{errors}, watch, setError, clearErrors ,setValue,reset} = useForm({
        defaultValues: {...defaultValues} 
      });
    let { heading, fields } = template;
    fields = [...fields,{
        type: "hidden",
         name: 'updatedBy',
         contains:"hidden",
         value:localStorage.userId,
          }]
     let watchValues = watchFields ? watch(watchFields) : watch([]);
     validate(watchValues, { errors, setError, clearErrors });
    //console.log({...defaultValues})
const resetForm=(defValues)=>{
    var time = Date().toLocaleString()
    JSON.stringify(defaultValues) === '{}' ? reset({"time":Date().toLocaleString()}) : reset(defaultValues)
}

    useEffect(()=>{resetForm(defaultValues)},[defaultValues])

    useEffect(()=>{validate(watchValues, { errors, setError, clearErrors })},[...watchValues]) 
    const onSubmitForm=(values,e)=>   {
        console.log(values);
        onSubmit(values);
        e.target.reset()
      }  
      const dynamicStyles = typeof styles === "undefined" ? {} : styles;
     return (
        <Row className={classes.formholder}>
            <Form onSubmit={handleSubmit(onSubmitForm)} className={classes.formcon}
            style={{
                ...dynamicStyles?.upper,
                ...(dynamicStyles?.upper ? {} : { background: "transparent",  }),
              }}
      >
               {heading && <>
                <div className={classes.tlhead}> 
  <Card body className={classes.title} style={{
                ...dynamicStyles?.uppertitle,
                ...(dynamicStyles?.uppertitle ? {} : { padding:'0'  }),
              }}>
    <Row>
    <Col md={12}> <h4>{heading}</h4> </Col> 
    </Row>
    </Card>
    </div>
  </>

               }  <Row
               style={{
                 ...dynamicStyles?.upperRow,
                 ...(dynamicStyles?.upperRow ? {} : { background: "transparent" }),
                 border: "none",
               }}
             >
                {renderFields(fields,rowwise,watchValues,register,errors,setValue)}
                </Row>
              
                <Row >
                    {btButtons && btButtons}
                </Row>
                <Row className="col-12 d-flex justify-content-end">
                {buttonName && <Button type="submit" className={classes.btn}>{buttonName}</Button>}
                {buttonName && <Button type="button" variant="danger" className={classes.btn} onClick={onCancel}>Cancel</Button>}
                </Row>
            </Form>
        </Row>
    );
}
export default CreateForm;
