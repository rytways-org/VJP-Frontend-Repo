import React from 'react'
import Card from '../../UI/cards/SimpleCard'
import SearchCard from '../../UI/cards/SearchCard'
import classes from './Products.module.css'
import bootstrap from 'bootstrap';

function Products() {

  return (
    <SearchCard title="Products Master" buttonName="Add">
      <p>Products</p>
    </SearchCard>
    )
}

export default Products
