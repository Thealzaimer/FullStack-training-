import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    userId:'54654654',
    price: 0,
    DateCreation:'',
  });
  

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

      const response = await fetch('http://localhost:4000/api/stuff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedformData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        navigate('/list');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


  return (
    <div>
      <h2>Form Component</h2>
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
          <br /><textarea
            id="description"
            name="description"
            cols={50}
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">imageUrl:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default Form;
