import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Textarea } from 'evergreen-ui'
import "./form.css"

function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productToModify } = location.state || {};

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: null,
    userId: '54654654',
    price: 0,
    DateCreation: '',
  });
  useEffect(() => {
    if (productToModify) {
      setFormData({
        title: productToModify.title || '',
        description: productToModify.description || null,
        imageUrl: productToModify.imageUrl || '',
        userId: '54654654', 
        price: productToModify.price || 0,
        DateCreation: productToModify.DateCreation || '',
      });
    }
  }, [productToModify]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedformData = {
        ...formData,
        DateCreation: new Date().toISOString(),
      };

      if (productToModify) {
        await fetch(`http://localhost:4000/api/stuff/${productToModify._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedformData),
        });
      } else {
        await fetch('http://localhost:4000/api/stuff', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedformData),
        });
      }

      console.log('Form data submitted successfully');
      navigate('/list');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className='body'>
      <h2>{productToModify ? 'Modify Product' : 'Create New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea 
            id="description"
            name="description"
            placeholder='write a description'
            cols={50}
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            accept="image/*"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;