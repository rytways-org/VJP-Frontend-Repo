import React from 'react'
import PoEntry from "../GeneratePo/PoEntry";
import SimpleCard from '../../../../UI/cards/SimpleCard';
import { Button } from 'react-bootstrap';

export default function SelectPo(props) {

   
  return (
    <SimpleCard title="Select Po Type">
             <>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={props.showFormHandler( {}, "poForm","PO")}
                  >
                    Purchase Order
                  </Button>
                  <Button
                    variant="success"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={props.showFormHandler({}, "servicePo", [0, 1, 2, 3, 4])}
                  >
                    Service Purchase Order
                  </Button>
                  <Button
                    variant="primary"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={props.showFormHandler( {}, "poForm","Jo_Purchase_Order")}
                  >
                    Job Order
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.1em",
                      marginTop: "10px",
                    }}
                    onClick={props.onCancel}
                  >
                    Cancel
                  </Button>
                </>
       
    </SimpleCard>
  )
}
