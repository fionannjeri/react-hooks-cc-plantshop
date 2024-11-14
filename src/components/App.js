import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NewPlantForm from '../components/NewPlantForm'
import PlantList from '../components/PlantList';
import Search from '../components/Search';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(data => setPlants([...plants, data]));
  };

  const updatePrice = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice })
    })
      .then(res => res.json())
      .then(updatedPlant => {
        setPlants(plants.map(plant => 
          plant.id === id ? updatedPlant : plant
        ));
      });
  };

  const deletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setPlants(plants.filter(plant => plant.id !== id));
      });
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList 
        plants={filteredPlants}
        onUpdatePrice={updatePrice}
        onDelete={deletePlant}
      />
    </div>
  );
}

export default App;