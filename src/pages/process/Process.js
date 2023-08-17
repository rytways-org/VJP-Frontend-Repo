import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import classes from "./Process.module.css"
import {
  Container,
  Form,
  Button,
  Row,
  Col
  // InputGroup,
  // FormControl
} from "react-bootstrap";

import { useForm } from "react-hook-form";
import Card from 'react-bootstrap/Card';
import ProcessSelect from './ProcessSelect'
import ProcessSelected from './ProcessSelected'
import Testing from './Testing/Testing'


function Process() {

    const[allSelectedProcess,updateAllSelectedProcess]=useState([]);
   

    const OnSelectHandler = (event) => {
        updateAllSelectedProcess(oldArray => oldArray.includes(event.target.value) ? 
        oldArray.filter(id => id!=event.target.value) : [...oldArray,event.target.value] )
        console.log(allSelectedProcess);
    }

  return (
    <Card className={classes.card}>
    <Card.Header>
    <h3>Product 89</h3>      
    </Card.Header>
    <Card.Body>
    <Row >
        <Col xs={12} md={4}>
            <ProcessSelect onSelect={OnSelectHandler}></ProcessSelect>
        </Col>
        <Col xs={12} md={8}>
            <ProcessSelected selectedProcess={allSelectedProcess} ></ProcessSelected>
        </Col>
    </Row>
     </Card.Body>
  </Card>
  )
}

export default Process
