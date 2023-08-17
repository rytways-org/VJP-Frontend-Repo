import React,{ useState, useReducer ,useCallback,useEffect} from 'react'
import CreateForm from '../../Components/Forms/CreateForm'
import SearchCard from '../../UI/cards/SearchCard'
import Modal from '../../UI/Modal/Modal';
import ProdPlanTable from './ProdPlanTable';
import classes from '../ProductionPages/ProductionEntry/productionentry.module.css'
import {data} from '../ProductionPages/ProductionEntry/data'
import Table from '../../Components/tables/Table';
import SimpleCard from '../../UI/cards/SimpleCard';
import InsDailyEntry from './InsDailyEntry';
import { useSelector, useDispatch } from "react-redux";



import { modalActions } from "../../store/modal-Slice";
import { alertActions } from "../../store/alert-slice";
import api from "../../Api";
import useFetch, { Provider } from "use-http";



const rowWiseFields = 4;

function QualityEntry(props) {
  const [showModal, selectedForm, selectedData] = useSelector((state) => [
    state.modalProps.showModal,
    state.modalProps.selectedForm,
    state.modalProps.selectedData,
  ]);
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  let [intialPlans,setInitialPlans]=useState([])
  const [products,setProducts] = useState([{value:"",label:"Select"}]);
  const [customers,setCustomers] = useState([{value:"",label:"Select"}]);
  const dispatch = useDispatch();

  const { get, post, response, loading, error } = useFetch({ data: [] });
  
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const plans = await post(api + "/order/qualityOrders", { id:1,random:Math.random()});
    const loadedcusts = await get(api+"/customer/loadOptions");
    const loadedprods = await get(api + "/product/loadOptions");
    if (response.ok) {
    setInitialPlans(plans);
    setCustomers([...customers,...loadedcusts])
    setProducts([...products,...loadedprods])
  }
    //  console.log(initialCusts)
  }, [get, response]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };

   const [showFormParams,setShowformparams]=useState({
        showForm:false,
        selectedForm:"",
        selectedItem:{ id:0,
            productName: "",
            cusName: "",
            part: "",
            quantity: "",
            cost: ""
            }
    })

    const actions = ["","","","","Inspection"]

    const showFormHandler = (item,action) => () => {
        if(action=="Inspection"){
          dispatch(
            modalActions.showModalHandler({
              selectedData: { ...item },
              selectedForm: (
                <InsDailyEntry
                  onCancel={() => dispatch(modalActions.hideModalHandler())}
                  selectedItem={{ ...item }}
                 
                />
              ),
              showModal: true,
            })
          );           
        }
    }
    const hideFormHandler=()=>{
        setShowformparams({...showFormParams,
            showForm:false,
            selectedForm:"",
            selectedItem:{...showFormParams.selectedItem,...{ id:0,
                productName: "",
                cusName: "",
                part: "",
                quantity: "",
                cost: "",
                }}
        })
       
        }

        const template = {
          fields: [
           {
              title: "Customer Name",
              type: "select",
              name: "customerId",
              contains: "Select",
              options: customers,
             },
            {
              title: "Product Name",
              type: "select",
              name: "productId",
              contains: "Select",
              options: products,
            },
            {
              title: "Order No",
              type: "text",
              name: "orderNo",
              contains: "text",
             inpprops:{}
            }
          ],
        };

        const loadProducts = useCallback(async(customerId)=>{
          const loadedprods = await post(api + "/product/loadProductsByCustomer" , {"id":customerId});
         // setProds([...prods, ...loadedprods]);
         setProducts([...[{value:"",label:"Select"}],...loadedprods])
        }, [post, response]);

        const searchPlans = async(values)=>{
          const plans = await post(api + "/order/searchQualityOrders", values);
          if (response.ok) setInitialPlans(plans);
        }
      
        function onSubmit(values) {
          searchPlans(values);
        }

        function validate(watchValues, errorMethods) {
          let { errors, setError, clearErrors } = errorMethods;
        
           // Firstname validation
           if(watchValues[0] != "" && watchValues[0]!=null){
              loadProducts(watchValues[0]);
          }
        }

    return (
    <div className={classes.container}>
    {showFormParams.showForm && <Modal onClose={hideFormHandler} size={10}>{showFormParams.selectedForm}</Modal>}
     <SearchCard title="Quality Entry" 
    buttonName="Add" 
    onHeaderClick={showFormHandler({},"dailyForm")} 
    bottonShow={true}>
    <CreateForm  template={template}
     watchFields={["customerId"]} 
     rowwise={rowWiseFields}
     validate={validate}
     onSubmit={onSubmit} 
     onCancel={props.onCancel}
     buttonName="Search">
     </CreateForm>
    </SearchCard>
    <SimpleCard md={12}>
    <Table cols={ProdPlanTable(showFormHandler,actions,[6,7])} data={intialPlans} striped
    rows={10}/>
      </SimpleCard>
    </div>
  )
}



 


  export default QualityEntry
