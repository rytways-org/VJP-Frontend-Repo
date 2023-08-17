import React, { useState, useEffect, useCallback,useContext } from "react";
import CreateForm from "../../../../Components/Forms/CreateForm";
import api,{proxy,downloadLink} from "../../../../Api";
import useFetch, { Provider } from "use-http";
import Table from "../../../../Components/tables/Table";
import { alertActions } from "../../../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import ApprovalTable from "./ApporvalTable";
import { data } from "./data";
import { useDownload } from 'use-http';
import { saveAs } from 'file-saver';
import axios from 'axios'
import AuthContext from '../../../../store/auth-context';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Ctheme from "../../../../Components/Ctheme/Ctheme";

const styles = {
  upper: {
    
    padding: "0", 
    
  },
  upperRow: {
    margin: '.5rem .5rem 0 .5rem',
    padding: '0 1rem',
    
  },
  uppertitle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: '0',
    backgroundColor:Ctheme.colors.ttle,
  },
};

const rowWiseFields = 3;
const prods =[];
const custs = [];
const actions = [];
function ViewQuotes(props) {
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const authCtx = useContext(AuthContext); 
  let token =  authCtx.token;
  let [deliveries, setDeliveries] = useState(props.selectedItem.deliveries
    ? props.selectedItem.deliveries
    : []);

  const [maxQty,setMaxQty] = useState(props.selectedItem ? props.selectedItem.quantity : 1);
  const addDeliveriesHandler = (values,action) => {
    if(action==="add"){
      setDeliveries(oldDeli=>[...oldDeli,values])
    }else{
      console.log({...values})
      setDeliveries(deliveries.filter(function( obj ) {
             return obj.lineNo !== values.lineNo;
         }))
    }
  };

  const handleAxiosDownload = (documentName) => {
    const filename = 'example.pdf'; // Replace with the actual filename
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

    axios({
      url: `http://localhost:5555/${api}/poQuotes/download/${documentName}`,
      headers:{Authorization : `Bearer ${token}`} ,
      method: 'GET',
      responseType: 'blob',
    //  config:config // Set the response type to 'blob' for file download
    })
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Failed to download the document:', error);
      });
  };
  const handleFetchDownload = (documentName) => {
    // Fetch the file from the API or any other source
    const headers = { 'Authorization': `Bearer ${token}` }
    fetch(`http://localhost:5555/${api}/poQuotes/download/${documentName}`,{
      headers : headers
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Save the file using the saveAs function from file-saver
        saveAs(blob, documentName);
      })
      .catch((error) => {
        console.error('Failed to download the file:', error);
      });
  };
  const handleFileDownload = async (documentName) => {
    try {
      const response = await axios.get(`${api}/poQuotes/download/${documentName}`, {
        responseType: 'blob',
      });
      saveAs(response.body, 'quote.txt'); 
    } catch (error) {
      alert('Failed to download the file.');
    }
  };
  const history =useHistory()
  const handleDownload = async (documentName) => {
    
    window.open(`${downloadLink}VJPUploads/${documentName}`,'_blank', 'noreferrer')
    //const result = await get(`${api}/poQuotes/download/${documentName}`);

    // if (response.ok) {
    //   const contentDisposition = response.headers.get('content-disposition');
    //   const filename = contentDisposition
    //     ? contentDisposition.split('filename=')[1]
    //     : 'file.txt'; // Default file name if not provided in the response

    //   saveAs(result, filename);
    // }
  };


  const handleEdit = (rowData)=>()=>{
    handleDownload(rowData.generatedFileName)
  }
  const [quotes, setQuotes] = useState([]);
  const [suppliers, setSuppliers] = useState([{}]);

  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const dispatch = useDispatch();

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };


  const saveDetails = async (poQuotes) => {
    //  procMaps
    const orderapi = "/poQuotes/uploadFile" ;
    const formData = new FormData();
    formData.append("file", poQuotes.file[0]);
    formData.append("poId",poQuotes.poId)
    formData.append("supplierId",poQuotes.supplierId)
    formData.append("remarks",poQuotes.remarks)
    console.log(orderapi);
    const returnObject = await post(api + orderapi, formData);
    console.log(returnObject);
    if (returnObject.retValues.status == 1) {
      if (returnObject.retValues.poQuotes.PoQuotesId) {
        setQuotes([returnObject.retValues.poQuotes,...quotes])
        AlertHandler(returnObject.retValues.message, "success");
      }
    } else {
      AlertHandler(returnObject.retValues.message, "danger");
    }
  };


  const loadInitialOptions1 = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
   const loadedQuotes = await post(api + "/poQuotes/getQuotesById",{id:props.selectedItem.poId,rand:Math.random()});
   console.log(loadedQuotes)
   if(loadedQuotes.length>0){
    setQuotes([...loadedQuotes]);
   } else{
    setQuotes([])
   }
   
    // console.log({...props.selectedItem})
  }, [get, response]);

  useEffect(() => {
    loadInitialOptions1();
  }, []); // componentDidMount

  function onSubmit(values) {
    //values.deliveries = deliveries;
    props.saveFunction(values);
    console.log(values);
    //props.saveFunction(values);
  }

  const template = {
    heading: "Vendor Quotes",
    fields: [
        {
            title: "Vendor Name",
            type: "select",
            name: "supplierId",
           contains: "Select",
            options: props.suppliers,
          },
    {
        title: "Upload Document",
        type: "Document",
        name: "file",
        contains: "Document",
        inpprops: {
            md:4,
          },
      },{
        title: "Remarks",
        type: "textarea",
        name: "remarks",
        contains: "textarea",
        inpprops: {
          md:4,
        },
      },
      {
        type: "hidden",
        name: "poId",
        value : props.selectedItem.poId
      },
    ],
  };
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
  
    // Firstname validation
    if (watchValues[0] > 0) {
        console.log(watchValues[0]);
        setMaxQty(watchValues[0]);
      }
  }
  return (
    <>
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["quantity"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      buttonName="Submit"
      styles={styles}
    ></CreateForm>
    <Table cols={ApprovalTable(handleEdit)} data ={quotes}></Table>
    </>
  );
}

export default ViewQuotes;


