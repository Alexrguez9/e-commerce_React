import data from '../../data.json';
import React from 'react';
import CardProduct from '../components/CardProduct';
import './Products.css';
import { useSearch } from '../context/SearchContext';
import Discount from '../components/Discount';

const Products = ({onClickAddToCart}) => {
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
          <CardProduct key={product.id} product={product} onClickAddToCart={onClickAddToCart} />
        ))}
      </div>
    </section>
    
  );

}
export default Products;