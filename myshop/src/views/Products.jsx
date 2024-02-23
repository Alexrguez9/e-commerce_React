import React, { useEffect, useState } from 'react';
import './Products.css';
import data from '../data/data.json';
import CardProduct from '../components/CardProduct';
import Discount from '../components/Discount';
import { useSearch } from '../context/SearchContext';

const Products = () => {
  const { searchText } = useSearch();
  const [products, setProducts] = useState(data);
  
  useEffect(() => {
    // Filtrar productos cuando cambia el searchText
    const filteredProducts = data.filter(product => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setProducts(filteredProducts);
  }, [searchText]);

  const updateProduct = (productId, updatedProductData) => {
    // Actualizar el producto en el estado
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, ...updatedProductData };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <section className='discount-and-products'>
      <Discount />
      <div className='products-list'>
        {products.map((product) => (
            <CardProduct key={product.id} product={product} updateProduct={updateProduct} />
        ))}
      </div>
    </section>
    
  );

}
export default Products;