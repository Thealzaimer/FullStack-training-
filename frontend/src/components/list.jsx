import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchbar';
import './list.css';

function List() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:4000/api/stuff');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = products;
    if (priceFilter === 'lessThan100') {
      filteredProducts = products.filter((product) => product.price < 100);
    } else if (priceFilter === '100To500') {
      filteredProducts = products.filter(
        (product) => product.price >= 100 && product.price <= 500
      );
    } else if (priceFilter === 'moreThan500') {
      filteredProducts = products.filter((product) => product.price > 500);
    }

    const searchFilteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(searchFilteredProducts);
  }, [searchTerm, products, priceFilter]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete("http://localhost:4000/api/stuff/" + productId);
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleModify = (productId) => {
    const productToModify = products.find((product) => product._id === productId);
    navigate('/form', { state: { productToModify } });
  };

  return (
    <div>
      <h2>Product List</h2>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <div>
        <label>
          Price Filter:
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="lessThan100">Less than $100</option>
            <option value="100To500">$100 - $500</option>
            <option value="moreThan500">More than $500</option>
          </select>
        </label>
      </div>
      <ul>
        {searchResults.map((product) => (
          <li key={product._id}>
            <strong className='title'>{product.title}</strong>
            <br /> {product.description}
            <br /> <img src={product.imageUrl} alt="" className='img' />
            <br />- {product.price} USD
            <br />
            <br />
            <button onClick={() => handleModify(product._id)}>Modify</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;