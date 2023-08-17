import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import classes from "./orders.module.css";
import { data } from "./data";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Row, Col,Alert } from "react-bootstrap";
import PurchaseRequestTable from "./MaterialTable";
import PurchaseRequestForm from "./MaterialRequestForm";
import Table from "../../../Components/tables/Table";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
import ApprovalForm from './PoStatusForm/ApprovalForm'
import TransferForm from './PoStatusForm/TransferForm'
import ReturnForm from "./PoStatusForm/ReturnForm";


const rowWiseFields = 4;
const template = {
  fields: [
    {
      title: "Product Name",
      type: "text",
      name: "tensile",
      contains: "text",
      inpprops: {
        minlength: 0,
        maxlength: 30,
      },
    },
    {
      title: "Customer Name",
      type: "text",
      name: "tensile",
      contains: "text",
      inpprops: {
        minlength: 0,
        maxlength: 30,
      },
    },
    {
      title: "Internal Part No",
      type: "text",
      name: "tensile",
      contains: "text",
      inpprops: {
        minlength: 0,
        maxlength: 30,
      },
    },
    {
      title: "Product Category",
      type: "select",
      name: "outsouredTo",
      contains: "Select",
      options: [
        { value: "", label: "Select" },
        { value: 1, label: "Category 1" },
        { value: 2, label: "Category 2" },
      ],
    },
  ],
};

function MaterialSearch(props) {
  const [products, setProducts] = useState();
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [loadState,setLoadState] =useState(Math.random());
  
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);

  const [showModal, selectedForm, selectedData] = useSelector((state) => [
    state.modalProps.showModal,
    state.modalProps.selectedForm,
    state.modalProps.selectedData,
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
  const loadInitialProducts = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialProds = await get(api + "/product/products");
    if (response.ok) setProducts(initialProds);
    }, [get, response,loadState]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]); // componentDidMount

  const productSave = async (product) => {
    const newProduct = await post(api + "/product/create", product);
    if (response.ok) {
      if (product.productId) {
        setProducts(
          products.map((prod) =>
            prod.productId === product.productId ? product : prod
          )
        );
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Product Updated Successfully", "success");
      } else {
        setProducts([...products, newProduct]);
        dispatch(modalActions.hideModalHandler());
        AlertHandler("Product Created Succesfully", "success");
      }
    } else {
      dispatch(modalActions.hideModalHandler());
      AlertHandler("Product Details Failed To Save", "danger");
    }
  };
  const actions = ["edit","productForm","approvalForm","materialForm"];

  const showFormHandler = (item, action) => () => {
    if (action == "productForm") {
         dispatch(
            modalActions.showModalHandler({
              selectedData: { ...item },
              selectedForm: (
                <PurchaseRequestForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={selectedData}
                  saveFunction = {productSave}
                />
              ),
              showModal: true,
            })
          )
    }else if (action === "edit") {
        console.log({...item})
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
                <PurchaseRequestForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={item}
                  saveFunction = {productSave}
                />
              ),
              showModal: true,
          })
        );
      }else  if (action == "approvalForm") {
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
              <>
                {(
                  <ApprovalForm
                    selected={item}
                    saveFunction={productSave}
                    onCancel = {() => dispatch(modalActions.hideModalHandler())}
                    loadState={loadState}
                  ></ApprovalForm>
                ) }
              </>
            ),
            showModal: true,
          })
        );
      }else  if (action == "transfer") {
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
              <>
                {(
                  <TransferForm
                    selected={item}
                    saveFunction={productSave}
                    onCancel = {() => dispatch(modalActions.hideModalHandler())}
                    loadState={loadState}
                  ></TransferForm>
                ) }
              </>
            ),
            showModal: true,
          })
        );
      }else  if (action == "return") {
        dispatch(
          modalActions.showModalHandler({
            selectedData: { ...item },
            selectedForm: (
              <>
                {(
                  <ReturnForm
                    selected={item}
                    saveFunction={productSave}
                    onCancel = {() => dispatch(modalActions.hideModalHandler())}
                    loadState={loadState}
                  ></ReturnForm>
                ) }
              </>
            ),
            showModal: true,
          })
        );
      }
  };

  return (
    <div className={classes.container}>
      <SearchCard
        title="Material Request Search"
        buttonName="Add"
        onHeaderClick={showFormHandler({}, "productForm", [0, 1, 2, 3, 4])}
        bottonShow={showModal}
      >
        <CreateForm
          template={template}
          rowwise={rowWiseFields}
          validate={validate}
          onSubmit={onSubmit}
          onCancel={props.onCancel}
          buttonName="Search"
        ></CreateForm>
      </SearchCard>
      <SimpleCard md={12}>
          <Table
            cols={PurchaseRequestTable(showFormHandler, actions)}
            data={data}
            striped
          />
      
      </SimpleCard>
    </div>
  );
}

export default MaterialSearch;

function onSubmit(values) {
  console.log(values);
}

function validate(watchValues, errorMethods) {
  let { errors, setError, clearErrors } = errorMethods;

  // Firstname validation
  if (watchValues["firstname"] === "Admin") {
    if (!errors["firstname"]) {
      setError("firstname", {
        type: "manual",
        message: "You cannot use this first name",
      });
    }
  } else {
    if (errors["firstname"] && errors["firstname"]["type"] === "manual") {
      clearErrors("firstname");
    }
  }
}
