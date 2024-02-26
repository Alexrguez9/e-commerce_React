import React, { useEffect, useState } from 'react';
import './Products.css';
import CardProduct from '../components/CardProduct';
import Discount from '../components/Discount';
import { useSearch } from '../context/SearchContext';
import { useProducts } from '../customHooks/useProducts';

const Products = () => {
  const { searchText } = useSearch();

  const { 
    products, 
  } = useProducts();
  



  return (
    <section className='discount-and-products'>
      <Discount />
      <div className='products-list'>
        {products.map((product) => (
            <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
    
  );

}
export default Products;