import React, { useState, useEffect } from 'react';
//import the components we will need
import AnimalCard from './AnimalCard';
import ApiManager from '../../modules/ApiManager';

const AnimalList = props => {
  // The initial state is an empty array
  const [animals, setAnimals] = useState([]);

  const getAnimals = () => {
    // After the data comes back from the API, we
    //  use the setAnimals function to update state
    return ApiManager.getAllXWithY("animals", "employee").then(animalsFromAPI => {
      setAnimals(animalsFromAPI)
    });
  };

  // got the animals from the API on the component's first render
  useEffect(() => {
    getAnimals();
  }, [animals]);
  //Added animals here to get the DOM to refresh when an animal is deleted

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
            deleteAnimal={() => {
              props.handleDeleteAnimal(animal.id)
                .then(getAnimals);
            }} 
            {...props}
          />)}
      </div>
    </React.Fragment>
  );
};
export default AnimalList