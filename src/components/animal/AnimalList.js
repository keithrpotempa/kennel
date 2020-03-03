import React, { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import ApiManager from '../../modules/ApiManager';

const AnimalList = props => {
  const [animals, setAnimals] = useState([]);
  const [animalOwners, setAnimalOwners] = useState([]);

  const getAnimals = () => {
    return ApiManager.getAllXWithTheirOneY("animals", "employee").then(animalsFromAPI => {
      setAnimals(animalsFromAPI)
    });
  };

  /* animalOwners Challenge:
    After all the animals are put in state, 
    animalOwners is fetched, with Owners expanded 
    (so we can have their names), then set in state. 
  */

  const getAnimalOwners = () => {
    return ApiManager.getAllXWithTheirOneY("animalowners", "owner")
      .then(results => {
        setAnimalOwners(results)
      })
  }

  useEffect(() => {
    getAnimals();
    getAnimalOwners();
  }, []);

  return (
    <React.Fragment>
      <section className="section-content">
        <button type="button"
            className="btn"
            onClick={() => {props.history.push("/animals/new")}}>
            Admit Animal
        </button>
      </section>
      <div className="container-cards">
        {animals.map(animal =>
          <AnimalCard
            key={animal.id}
            animal={animal}
            // animalOwners are filtered for matching animalIds 
            animalOwners={animalOwners.filter(animalOwner => animalOwner.animalId === animal.id)}
            handleDelete={() => {
              ApiManager.delete("animals", animal.id)
                .then(getAnimals);
            }} 
            {...props}
          />)}
      </div>
    </React.Fragment>
  );
};
export default AnimalList