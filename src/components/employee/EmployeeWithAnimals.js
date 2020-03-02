import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'
import AnimalCard from '../animal/AnimalCard'

const EmployeeWithAnimals = props => {
  const [employee, setEmployee] = useState({});
  const [animals, setAnimals] = useState([]);

  const getEmployeesWithAnimals = () => {
    ApiManager.getOneXWithManyY("employees", "animals", props.match.params.employeeId)
    .then(APIResult => {
      setEmployee(APIResult);
      setAnimals(APIResult.animals);
    });
  }

  useEffect(() => {
    getEmployeesWithAnimals();
  }, []);

  return (
    <div className="card">
      <p>Employee: {employee.name}</p>
      {animals.map(animal =>
        <AnimalCard
          key={animal.id}
          animal={animal}
          employee={employee}
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