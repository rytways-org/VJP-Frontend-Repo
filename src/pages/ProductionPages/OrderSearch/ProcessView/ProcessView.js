import React, { useState,useCallback,useEffect } from "react";
import classes from "./processview.module.css";
import SimpleCard from "../../../../UI/cards/SimpleCard";
import { Card, Row } from "react-bootstrap";
import Table from "../../../../Components/tables/Table";
import { processData } from "./ProcessViewData";
import { ProcessViewTable } from "./ProcessViewTable";
import Modal from "../../../../UI/Modal/Modal";
import ProcessHistory from "./ProcessHistory";
import api from "../../../../Api";
import useFetch, { Provider } from "use-http";

function ProcessView(props) {
  const [showHistory, setShowHistory] = useState(false);
  const [procMaps, setProcMaps] = useState();
  const [loadState, setLoadState] = useState(Math.random());
  const { get, post, response, loading, error } = useFetch({ data: [] });


  const loadInitialData = useCallback(async () => {
    const intialdata = await post(api + "/ppMap/qualityProcessMaps", props.selectedItem);
    if (response.ok) 
    setProcMaps(intialdata);
     
  }, [post, response,loadState]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]); // componentDidMount

  const showHistoryHandler = () => {
    setShowHistory(!showHistory);
  };

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    Month: "",
    Year: "",
    Remarks: "",
    Quantity: "",
  });

  const handleEdit = (item) => () => {
    setSelectedItem();
    showHistoryHandler();

    // alert(JSON.stringify(item))
  };
  //{propsproductName}-({customerName})
  return (
    <SimpleCard>
      {showHistory && (
        <Modal onClose={showHistoryHandler} size={10}>
          <ProcessHistory></ProcessHistory>
        </Modal>
      )}
      <Card body className={classes.title}>
        <h5>
          Stock Status of {props.selectedItem.orderNo}(
          {props.selectedItem.product.productName})
        </h5>{" "}
      </Card>

      <Row className={classes.tableCon}>
        <Table
          data={procMaps}
          cols={ProcessViewTable(handleEdit)}
          className={classes.tableCon}
          rows={10}
        ></Table>
      </Row>
    </SimpleCard>
  );
}

export default ProcessView;
