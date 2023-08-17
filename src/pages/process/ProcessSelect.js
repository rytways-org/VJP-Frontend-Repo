import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
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
import { ProcessData } from "./ProcessData";

function ProcessSelect(props) {
  return (
    <div>
      <ul class="list-group">
      {ProcessData.map((item) => {
        return  <li class="list-group-item">
        <input class="form-check-input me-1" value={item.id} type="checkbox" aria-label="..." 
        onClick={props.onSelect} ></input>
        {item.processName}
      </li>;
      })}
</ul>
    </div>
  )
}

export default ProcessSelect
