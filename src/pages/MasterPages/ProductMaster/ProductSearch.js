import React, { useState, useEffect, useCallback } from "react";
import CreateForm from "../../../Components/Forms/CreateForm";
import SearchCard from "../../../UI/cards/SearchCard";
import Modal from "../../../UI/Modal/Modal";
import classes from "./orders.module.css";
import { data } from "./data";
import SimpleCard from "../../../UI/cards/SimpleCard";
import { Row, Col,Alert } from "react-bootstrap";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProcessMapForm from "./ProcessForm/ProcessMapForm";
import MaterialMapForm from "./ProMaterialMap/MaterialMapForm";
import Table from "../../../Components/tables/Table";
import api from "../../../Api";
import useFetch, { Provider } from "use-http";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modal-Slice";
import { alertActions } from "../../../store/alert-slice";
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

function ProductSearch(props) {
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
  const actions = ["edit","productForm","processForm","materialForm"];

  const showFormHandler = (item, action) => () => {
    if (action == "productForm") {
         dispatch(
            modalActions.showModalHandler({
              selectedData: { ...item },
              selectedForm: (
                <ProductForm
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
                <ProductForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={item}
                  saveFunction = {productSave}
                />
              ),
              showModal: true,
          })
        );
      }else if (action === "processForm") {
        console.log({...item})
        dispatch(
          modalActions.showModalHandler({
            selectedData: {productId:item.productId},
            selectedForm: (
                <ProcessMapForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={{productId:item.productId,productName:item.productName}}
                  saveFunction = {productSave}
                />
              ),
              showModal: true,
          })
        );
      }else if (action === "materialForm") {
        console.log({...item})
        dispatch(
          modalActions.showModalHandler({
            selectedData: {productId:item.productId},
            selectedForm: (
                <MaterialMapForm
                  onCancel={()=>dispatch(modalActions.hideModalHandler())}
                  selectedItem={{productId:item.productId,productName:item.productName}}
                  saveFunction = {productSave}
                />
              ),
              showModal: true,
          })
        );
      }
  };

  return (
    <div className={classes.container}>
      <SearchCard
        title="Product Search"
        buttonName="New Product"
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
        {products && (
          <Table
            cols={ProductTable(showFormHandler, actions)}
            data={products}
            rows={10}
          />
        )}
      </SimpleCard>
    </div>
  );
}

export default ProductSearch;

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
