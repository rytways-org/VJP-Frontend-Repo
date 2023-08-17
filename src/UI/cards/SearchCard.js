import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
    Button,
    Row,
    Col,
    Card
    // FormControl
  } from 'react-bootstrap';
import classes from './SearchCard.module.css'
import * as FaIcons from 'react-icons/fa';

function SearchCard(props, styles) {
  const dynamicStyles = typeof props.styles === "undefined" ? {} : props.styles;
  return (
    <Card
      className={classes.card}
      style={{
        ...dynamicStyles.search,
        ...(dynamicStyles.search ? {} : { background: "transparent" }),
      }}
    >
    <Card.Header className={classes.cardHeader}>
    <Row >
    <Col xs={12} md={!props.bottonShow ? { span: 5, offset: 3 } : { span: 12 }} className='d-flex justify-content-center'><h4>{props.title}</h4></Col>
        <Col xs={12} md={4} className='d-flex justify-content-end'>
            {!props.bottonShow && <Button variant="primary" className={classes.addButton} onClick={props.onHeaderClick}>
              {props.buttonName}</Button>}
        </Col>
      </Row>
   </Card.Header>
    <Card.Body className={classes.cardBody}>
        {props.children}
    </Card.Body>
  </Card>
  )
}

export default SearchCard
