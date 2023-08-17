import React, {useState} from "react";
import {
  Card,Button,Row,Col
  } from "react-bootstrap";
import classes from './simpleCard.module.css'

function SimpleCard(props) {
  const dynamicUpper = typeof props.upper === "undefined" ? {} : props.upper;
  const dynamicUpperTwo = typeof props.uppertwo === "undefined" ? {} : props.uppertwo;
  const dynamicStyles =
  typeof props.styles === "undefined" ? {} : props.styles;

  const cardStyles = {
    ...dynamicUpper,
    background: dynamicUpper.backgroundColor || "transparent",
  };

  const cardStylesUpperTwo = {
    ...dynamicUpperTwo,
    background: dynamicUpperTwo.backgroundColor || "transparent",
  };

  return (
    <Card
      className={`${classes.card} ${props.className}`}
      style={props.useUpperTwoStyle ? cardStylesUpperTwo : cardStyles}
    >
   {props.title && <>
    <Card
  body
  className={classes.title}
  style={{
    ...(dynamicStyles?.simplettl || {}),
  }}
>

    <Row>
    <Col md={{ span: 6, offset: 3 }}> <h4>{props.title}</h4> </Col> 
    </Row>
    </Card>
  </>} 
  <Card.Body style={{ padding: '0' }}>

    {props.children}
    </Card.Body>
  </Card>
  )
}
export default SimpleCard
