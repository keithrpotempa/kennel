import React, { useState, useEffect }from 'react';
import ApiManager from '../../modules/ApiManager';
import AnimalForm from './AnimalForm';
import './AnimalForm.css'

const AnimalNew = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [animal, setAnimal] = useState({name: "", breed: "", employeeId: 0});
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    return ApiManager.getAll("employees").then(employees => {
      setEmployees(employees);
    })
  } 

  const handleFieldChange = evt => {
    const stateToChange = { ...animal };
    stateToChange[evt.target.id] = evt.target.value;
    setAnimal(stateToChange);
  }

  const constructAnimal = (evt) => {
    evt.preventDefault();
    if (animal.name === "" || animal.breed === "") {
      window.alert("Please input an animal name and breed");
    } else {
      setIsLoading(true);
      const constructedAnimal = {
        name: animal.name,
        breed: animal.breed,
        employeeId: parseInt(animal.employeeId)
      }
      return constructedAnimal;
    }
  };
  
  const saveAnimal = (animal) => {
    return ApiManager.post("animals", animal)
      // FIXME: There's some terrible error with this 
      // when utilizing the <AnimalForm> component...
      // .then(() => props.history.push("/animals"));
  }

  useEffect(() => getEmployees(), [])

  return (
    <>
      <AnimalForm 
        constructAnimal={constructAnimal}
        saveAnimal={saveAnimal}
        isLoading={isLoading}
        employees={employees}
        animal={animal}
        handleFieldChange={handleFieldChange}
        {...props}
      />
    </>
  );
};

export default AnimalNew