import React, { useState, useEffect } from 'react';
import AnimalManager from '../../modules/AnimalManager';
import { handleDelete } from '../../modules/helpers'
import './AnimalDetail.css'

const AnimalDetail = props => {
  const [animal, setAnimal] = useState({ name: "", breed: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AnimalManager.get(props.animalId)
      .then(animal => {
        setAnimal({
          name: animal.name,
          breed: animal.breed,
          employeeId: animal.employeeId
        });
        setIsLoading(false);
      });
  }, [props.animalId]);
  
  // TODO: Get the employee to be their name, not just their ID
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require('./dog.svg')} alt="My Dog" />
        </picture>
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{animal.name}</span></h3>
        <p>Breed: {animal.breed}</p>
        <p>Employee: {animal.employeeId}</p>
        <button type="button" disabled={isLoading} onClick={() => {
          setIsLoading(true)
          handleDelete(props)
        }}>
          Discharge
        </button>
      </div>
    </div>
  );
}

export default AnimalDetail;