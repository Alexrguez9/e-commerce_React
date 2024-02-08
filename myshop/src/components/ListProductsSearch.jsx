import data from '../../data.json';
import React from 'react';
import CardProduct from './CardProduct';
import './ListProductsSearch.css';

function ListProductsSearch({searchText, onClickAddToCart}) {
  //const [search, setSearch] = useState('');
  const filteredProducts = data.filter(product => {
    if (searchText === '') {
      return product;
    }else{
        return product.title.toLowerCase().includes(searchText);
    }
  });

  return (
    <div className='products-list'>
      {filteredProducts.map((product) => (
        <CardProduct key={product.id} product={product} onClickAddToCart={onClickAddToCart} />
      ))}
    </div>
  );

}
export default ListProductsSearch;