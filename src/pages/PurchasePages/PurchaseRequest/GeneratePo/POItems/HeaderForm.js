import react from "react";
import CreateForm from "../../../../../Components/Forms/CreateForm";
const rowWiseFields = 3;
const HeaderForm = (props) => {
  const template = {
    heading: "PO Entry",
    fields: [
      {
        title: "PO Date",
        type: "date",
        name: "poDate",
        contains: "date",
        validationProps: "Po Date is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "PO Number",
        type: "text",
        name: "poNo",
        contains: "text",
        validationProps: "Po No is required",
        inpprops: {
          format: "dd/mm/yyyy",
        },
      },
      {
        title: "Company",
        type: "select",
        name: "company",
        contains: "Select",
        options: [
          { value: "Select", label: "Select" },
          { value: "VJP Foundaries", label: "VJP Foundaries" },
          { value: "VJP Aluminium", label: "VJP Aluminium" },
        ],
      },
      {
        title: "Supplier",
        type: "select",
        name: "supplierId",
        contains: "Select",
        options: props.suppliers,
      },
      {
        title: "Delivery Address",
        type: "textarea",
        name: "deliveryAddress",
        contains: "textarea",
        validationProps: "Delivery Address is required",
        inpprops: {
          md: 4,
        },
      },
    ],
  };
  function validate(watchValues, errorMethods) {
    let { errors, setError, clearErrors } = errorMethods;
    console.log(watchValues[0]);
    console.log("logged");
    if (watchValues[0] != "" && watchValues[0]) {
      console.log(watchValues[0]);
      props.getGstDetails(watchValues[0])();
    }
  }

  return (
    <CreateForm
      template={template}
      rowwise={rowWiseFields}
      watchFields={["supplierId"]}
      validate={validate}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      buttonName=""
    ></CreateForm>
  );
};

export default HeaderForm;

function onSubmit(values) {}
