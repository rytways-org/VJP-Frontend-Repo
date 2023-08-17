import React from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import Production from "../../images/production.png";
import Stores from "../../images/stores.png";
import Purchase from "../../images/purchase.png";
import Costing from "../../images/costing.png";
import Quality from "../../images/quality.png";

const images = {
  "Production": Production,
  "Stores": Stores,
  "Purchase": Purchase,
  "Quality": Quality,
  "Costing" : Costing,
  "Mis Reports" : Costing,
  "Masters":Costing,
  "Production2":Costing
};

const StyCard = styled(Card).attrs(() => ({
  className: "md-4",
}))`

  margin: 1em  1em ;
  padding: 0.25em 0.25em;
  height: 14em;
  width: 11em;
  border-color: #e8e7ea;
  border-radius: .2rem;
                                                              
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 5px black; 
  }
`;
const StyCardImg = styled(Card.Img)`
  height: 11em;
  width: 10em;
  display: flex;
  justify-content: center;
  background-color: white; 
  border-radius: 0rem;
`;

const StyCardTitle = styled(Card.Title)`
  height: 0.2em;
  display: flex;
  justify-content: center;
  padding: 0.2em 0.2em 0.2em 0.2em;
  margin-top: 0.4em;
  background-color: #fa8072;
`;
function ModuleCard(props) {
  const moduleLift = () => {
    const selectedmodules = {
      id: props.module.module.moduleId,
      path: props.module.module.modulePath,
    };
    console.log(selectedmodules)
    props.onModuleSelect(selectedmodules);
  };

  return (
    <StyCard onClick={moduleLift}>
      <StyCardImg src={images[props.module.module.moduleImage]} />
      <StyCardTitle>{props.module.module.moduleName}</StyCardTitle>
    </StyCard>
  );
}

export default ModuleCard;
