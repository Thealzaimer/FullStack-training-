import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchbar'; // Import the SearchBar component
import './list.css';

function List() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
    setSearchResults(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

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
