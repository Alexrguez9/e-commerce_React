import './App.css'
import Discount from './components/Discount.jsx';
import ListProductsSearch from './components/ListProductsSearch.jsx';

function App({searchText}) {
  return (
    <>
      <Discount />
        <ListProductsSearch searchText={searchText} />
        {/* 
        {data.map((product) => (
          console.log(product.id),
          <CardProduct key={product.id} product={product} />
        ))}
        */}
    </>
  )
}

export default App
