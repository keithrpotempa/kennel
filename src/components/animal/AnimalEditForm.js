import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import AnimalForm from "./AnimalForm"
import "./AnimalForm.css";

const AnimalEditForm = props => {
  const [animal, setAnimal] = useState({ name: "", breed: "", employeeId: 0 });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEmployees = () => {
    return ApiManager.getAll("employees").then(employeesFromAPI => {
      setEmployees(employeesFromAPI)
    });
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...animal };
    stateToChange[evt.target.id] = evt.target.value;
    setAnimal(stateToChange);
  };

  const constructUpdatedAnimal = evt => {
    evt.preventDefault();
    if (animal.name === "" || animal.breed === "") {
      window.alert("Please input an animal name and breed");
    } else {
      setIsLoading(true);
      // This is an edit, so we need the id
      const editedAnimal = {
        id: props.match.params.animalId,
        name: animal.name,
        breed: animal.breed,
        employeeId: parseInt(animal.employeeId)
      }
      return editedAnimal
    }
  };

  const updateAnimal = (animal) =>  {
    ApiManager.update("animals", animal).then(() =>
        props.history.push("/animals")
      );
  } 

  useEffect(() => {
    getEmployees();
    ApiManager.get("animals", props.match.params.animalId).then(animal => {
      setAnimal(animal);
      setIsLoading(false);
    });
  }, []);


  // Props to define:
  // Name
  // Breed
  // Employee

  return (
    <>
      <AnimalForm 
        constructAnimal={constructUpdatedAnimal}
        saveAnimal={updateAnimal}
        isLoading={isLoading}
        employees={employees}
        animal={animal}
        handleFieldChange={handleFieldChange}
        {...props}
      />
    </>
  );
};

export default AnimalEditForm;
