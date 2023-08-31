import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchbar';
import './list.css';
import { compareAsc, parseISO } from 'date-fns'; // Import date-fns functions for date comparison

function List() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchProducts(page) {
      try {
        const response = await axios.get(`http://localhost:4000/api/stuff?page=${page}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    let filteredProducts = paginatedProducts;

    if (priceFilter === 'lessThan100') {
      filteredProducts = paginatedProducts.filter((product) => product.price < 100);
    } else if (priceFilter === '100To500') {
      filteredProducts = paginatedProducts.filter(
        (product) => product.price >= 100 && product.price <= 500
      );
    } else if (priceFilter === 'moreThan500') {
      filteredProducts = paginatedProducts.filter((product) => product.price > 500);
    }

    const searchFilteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(searchFilteredProducts);
  }, [searchTerm, products, priceFilter, currentPage]);

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

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const [sortCriteria, setSortCriteria] = useState('creationDate'); 
  const [sortAscending, setSortAscending] = useState(true); 

  const handleSortChange = (newSortCriteria) => {
    if (newSortCriteria === sortCriteria) {
      setSortAscending(!sortAscending);
    } else {
      setSortCriteria(newSortCriteria);
      setSortAscending(true);
    }
  };

  const compareProducts = (product1, product2) => {
    if (sortCriteria === 'creationDate') {
      const date1 = parseISO(product1.DateCreation);
      const date2 = parseISO(product2.DateCreation);
      return sortAscending ? compareAsc(date1, date2) : compareAsc(date2, date1);
    } else if (sortCriteria === 'modificationDate') {
      const date1 = parseISO(product1.DateModification);
      const date2 = parseISO(product2.DateModification);
      return sortAscending ? compareAsc(date1, date2) : compareAsc(date2, date1);
    } else if (sortCriteria === 'title') {
      return sortAscending
        ? product1.title.localeCompare(product2.title)
        : product2.title.localeCompare(product1.title);
    }
  };

  const sortedSearchResults = searchResults.slice().sort(compareProducts);

  return (
    <div className='container'>
      <h2 className='product-title'>Product List</h2>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <div>
        <label>
          <h2 className='price'>Price Filter:</h2>
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="lessThan100">Less than $100</option>
            <option value="100To500">$100 - $500</option>
            <option value="moreThan500">More than $500</option>
          </select>
        </label>
      </div>
      <div>
        <h2 className="sort-title">Sort By:</h2>
        <button
          className={`sort-button ${sortCriteria === 'creationDate' && 'active'}`}
          onClick={() => handleSortChange('creationDate')}
        >
          Creation Date
        </button>
        <button
          className={`sort-button ${sortCriteria === 'modificationDate' && 'active'}`}
          onClick={() => handleSortChange('modificationDate')}
        >
          Modification Date
        </button>
        <button
          className={`sort-button ${sortCriteria === 'title' && 'active'}`}
          onClick={() => handleSortChange('title')}
        >
          Title
        </button>
      </div>
      <ul>
        {sortedSearchResults.map((product) => (
          <li key={product._id} className='list'>
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
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default List;
