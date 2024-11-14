import React, { useState } from 'react';

function PlantCard({ plant, onUpdatePrice, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    onUpdatePrice(plant.id, parseFloat(newPrice));
    setIsEditing(false);
  };

  return (
    <div className={`plant-card ${isSoldOut ? 'sold-out' : ''}`}>
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      {isEditing ? (
        <form onSubmit={handlePriceSubmit}>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            step="0.01"
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <p onClick={() => setIsEditing(true)}>${plant.price}</p>
      )}
      <button onClick={() => setIsSoldOut(!isSoldOut)}>
        {isSoldOut ? "In Stock" : "Mark as Sold Out"}
      </button>
      <button onClick={() => onDelete(plant.id)}>Delete</button>
    </div>
  );
}

export default PlantCard;