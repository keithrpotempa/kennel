import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'
import AnimalCard from '../animal/AnimalCard'

const EmployeeWithAnimals = props => {
  const [employee, setEmployee] = useState({});
  const [animals, setAnimals] = useState([]);
  const [animalOwners, setAnimalOwners] = useState([]);

  const getEmployeesWithAnimals = () => {
    ApiManager.getOneXWithManyY("employees", "animals", props.match.params.employeeId)
    .then(APIResult => {
      setEmployee(APIResult);
      setAnimals(APIResult.animals);
    });
  }

  const getAnimalOwners = () => {
    return ApiManager.getAllXWithTheirOneY("animalowners", "owner")
      .then(results => {
        setAnimalOwners(results)
      })
  }

  useEffect(() => {
    getEmployeesWithAnimals();
    getAnimalOwners();
  }, []);

  return (
    <div className="card">
      <p>Employee: {employee.name}</p>
      {animals.map(animal =>
        <AnimalCard
          key={animal.id}
          animal={animal}
          employee={employee}
          animalOwners={animalOwners.filter(animalOwner => animalOwner.animalId === animal.id)}
          handleDelete={() => {
            ApiManager.delete("animals", animal.id)
              .then(getEmployeesWithAnimals);
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default EmployeeWithAnimals;