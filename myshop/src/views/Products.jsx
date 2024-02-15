import React from 'react';
import './Products.css';
import data from '../../data.json';
import CardProduct from '../components/CardProduct';
import Discount from '../components/Discount';
import { useSearch } from '../context/SearchContext';


const Products = () => {
  const { searchText } = useSearch();

  const filteredProducts = data.filter(product => {
    if (searchText === '') {
      console.log('VACIO')
      return product;
    }else{
      console.log(product)
      return product.title.toLowerCase().includes(searchText);
    }
  });

  return (
    <section className='discount-and-products'>
      <Discount />
      <div className='products-list'>
        {filteredProducts.map((product) => (
            <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
    
  );

}
export default Products;