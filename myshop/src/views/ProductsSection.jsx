import React, { useEffect, useState } from 'react';
import './Products.css';
import CardProduct from '../components/CardProduct';
import Discount from '../components/Discount';
import { useSearch } from '../context/SearchContext';
import { useProducts } from '../customHooks/useProducts';
import AddProductModal from '../components/AddProductModal';
import { useAuth } from '../context/AuthContext';

const ProductsSection = () => {
  const { searchText } = useSearch();
  const { products, loading, error, addProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useAuth();
  
  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleAddProduct = () => {
    openModal();
  }

  if (loading) {
    return <div>Cargando...</div>;
  }


  return (
    <>
    {isModalOpen && (
      <AddProductModal 
      closeModal={closeModal} 
      addProduct={(newProduct) => {
        addProduct(newProduct);
        closeModal();
      }}
     />
    )}

    <section className='discount-and-products'>
      <Discount />
      <div className='products-list'>
        {filteredProducts.map((product) => (
            <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
    {user?.role === 'admin' && (
        <button className='btn-new-product' onClick={handleAddProduct}>New product</button>
    )}
    </>
  );

}
export default ProductsSection;