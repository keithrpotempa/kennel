import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import EmployeeManager from "../../modules/EmployeeManager";
import "./AnimalForm.css";

const AnimalEditForm = props => {
  const [animal, setAnimal] = useState({ name: "", breed: "", employeeId: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    return EmployeeManager.getAll().then(employeesFromAPI => {
      setEmployees(employeesFromAPI)
    });
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...animal };
    stateToChange[evt.target.id] = evt.target.value;
    setAnimal(stateToChange);
  };

  const updateExistingAnimal = evt => {
    evt.preventDefault();
    setIsLoading(true);
    // This is an edit, so we need the id
    const editedAnimal = {
      id: props.match.params.animalId,
      name: animal.name,
      breed: animal.breed,
      employeeId: parseInt(animal.employeeId)
    };

    ApiManager.update("animals", editedAnimal).then(() =>
      props.history.push("/animals")
    );
  };

  useEffect(() => {
    ApiManager.get("animals", props.match.params.animalId).then(animal => {
      setAnimal(animal);
      setIsLoading(false);
    });
    getEmployees();
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={animal.name}
            />
            <label htmlFor="name">Animal name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="breed"
              value={animal.breed}
            />
            <label htmlFor="breed">Breed</label>
            <select
              className="form-control"
              id="employeeId"
              value={animal.employeeId}
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
              onClick={updateExistingAnimal}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AnimalEditForm;
