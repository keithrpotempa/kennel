import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import { handleDeleteAnimal } from '../../modules/helpers'
import './AnimalDetail.css'

const AnimalDetail = props => {
  const [animal, setAnimal] = useState({ name: "", breed: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiManager.getOneXWithY("animals", "employee", props.animalId)
      .then(animal => {
        setAnimal({
          name: animal.name,
          breed: animal.breed,
          employeeId: animal.employeeId,
          employeeName: animal.employee.name
        });
        setIsLoading(false);
      });
  }, [props.animalId]);
  
  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require('./dog.svg')} alt="My Dog" />
        </picture>
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{animal.name}</span></h3>
        <p>Breed: {animal.breed}</p>
        <p>Employee: {animal.employeeName}</p>
        <button type="button" disabled={isLoading} onClick={() => {
          setIsLoading(true)
          handleDeleteAnimal(props)
        }}>
          Discharge
        </button>
      </div>
    </div>
  );
}

export default AnimalDetail;