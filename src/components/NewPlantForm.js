import React, { useState } from 'react';

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlant({
      ...formData,
      price: parseFloat(formData.price)
    });
    setFormData({ name: '', image: '', price: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Plant Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        required
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;