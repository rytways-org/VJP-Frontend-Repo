import React, { useEffect, useCallback,useState} from 'react'
import CreateForm from '../../../Components/Forms/CreateForm';
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import Ctheme from '../../../Components/Ctheme/Ctheme';


const styles = {
  upper: {
    
    padding: "0", // Add the padding property here
  },
  upperRow: {
    
    padding: '0.5rem 1rem',
   
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor: Ctheme.colors.ttle,
  },
};
const rowWiseFields = 4;



function ProductForm(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });

  const [custs,setCusts] =useState([{"value":"","label":"Select"}]);
  const loadInitialCustomers = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const loadedcusts = await get(api+"/customer/loadOptions");
    setCusts([...custs,...loadedcusts]);
    console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => { loadInitialCustomers() }, []) // componentDidMount



  const template = {
    heading: 'New Product',
     fields: [
          {
              title: 'Product Name',
              type: 'text',
              name: 'productName',
              contains:"text",
              inpprops:{
                  minlength:8,
                  maxlength:80
              }
        }, {
          title: 'Customer Name',
          type: 'select',
          name: 'customerId',
          contains: 'Select',
          options:  custs
              }, 
        {
                title: 'Shot Weight',
                type: 'text',
                name: 'shotWeight',
                contains:"text",
                validation:"Quantity is Required",
                inpprops:{
                   
                }
      
          }, {
            title: 'As Cast Weight',
            type: 'text',
            name: 'asCastWeight',
            contains:"text",
            validation:"Quantity is Required",
            inpprops:{
              
            }
  
      },{
        title: 'Fg Weight',
        type: 'text',
        name: 'fgWeight',
        contains:"text",
        validation:"Quantity is Required",
        inpprops:{
         
        }

  },{
    title: 'Internal Part Number',
    type: 'text',
    name: 'internalPartCode',
    contains:"text",
    inpprops:{
        minlength:8,
        maxlength:80
    }
}, {
  title: 'Client Part Number',
  type: 'text',
  name: 'clientPartNumber',
  contains:"text",
  inpprops:{
      minlength:8,
      maxlength:80
  }
},{
  title: "Product Category",
  type: "select",
  name: "productCategory",
  contains: "Select",
  options: [
    { value: "Select", label: "Select" },
    { value: "Product1", label: "Product1" },
    { value: "Product2", label: "Product2" },
  ],
},{
  title: "Product Sub Category",
  type: "select",
  name: "prodSubCats",
  contains: "Select",
  options: [
    { value: "Select", label: "Select" },
    { value: "SubProduct1", label: "SubProduct1" },
    { value: "SubProduct2", label: "SubProduct2" },
  ],
},{
  title: 'Height',
  type: 'text',
  name: 'height',
  contains:"text",
  validation:"Quantity is Required",
  inpprops:{
      min:0,
      step:1
  }

},{
  title: 'Breadth',
  type: 'text',
  name: 'breadth',
  contains:"text",
  validation:"Quantity is Required",
  inpprops:{
      min:0,
      step:1
  }

},{
  title: 'Width',
  type: 'text',
  name: 'length',
  contains:"text",
  validation:"Quantity is Required",
  inpprops:{
  }

},{
  title: 'Rejection Percentage',
  type: 'text',
  name: 'rejectionPerc',
  contains:"text",
  validation:"Rejection Percentage is Required",
  inpprops:{
  }

},{
  title: 'Description',
  type: 'textarea',
  name: 'description',
  contains:"textarea",
  inpprops:{
    maxlength:256,
    md:3
  }
},
{
 type: 'hidden',
  name: 'productId',
  contains:"number",
  inpprops:{
      min:0,
      step:1
  }

},
        ]
    }
    


    async function onSubmit(values) {
      props.saveFunction({...values});
    }

  return (
    <CreateForm  template={template}
    rowwise={rowWiseFields}
    validate={validate}
    onSubmit={onSubmit} 
    onCancel={props.onCancel}
    buttonName="Submit"
    defaultValues={props.selectedItem}
    styles={styles}
    >
    </CreateForm>
  )
}

export default ProductForm


function onSubmit(values) {
    console.log(values);
  }
  
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if(watchValues['firstname'] === 'Admin'){
        if(!errors['firstname']){
            setError('firstname', {
                type: 'manual',
                message: 'You cannot use this first name'
            })
        }
    }else{
        if(errors['firstname'] && errors['firstname']['type'] === 'manual'){
            clearErrors('firstname');
        }
    }
  }
  
