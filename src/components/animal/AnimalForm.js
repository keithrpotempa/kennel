import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './AnimalForm.css'

const AnimalForm = props => {
  const [animal, setAnimal] = useState({ name: "", breed: "" });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEmployees = () => {
    return ApiManager.getAll("employees").then(employees => {
      setEmployees(employees);
    })
  } 

  const handleFieldChange = evt => {
    const stateToChange = { ...animal };
    stateToChange[evt.target.id] = evt.target.value;
    setAnimal(stateToChange);
  };

  const constructNewAnimal = evt => {
    evt.preventDefault();
    if (animal.Name === "" || animal.breed === "") {
      window.alert("Please input an animal name and breed");
    } else {
      setIsLoading(true);
      ApiManager.post("animals", animal)
        .then(() => props.history.push("/animals"));
    }
  };

  useEffect(() => {
    getEmployees();
  }, [])

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Animal name"
            />
            <label htmlFor="animalName">Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="breed"
              placeholder="Breed"
            />
            <label htmlFor="breed">Breed</label>
          <select
              className="form-control"
              required
              id="employeeId"
              onChange={handleFieldChange}
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <label htmlFor="employeeId">Employee</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewAnimal}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AnimalForm