import React from 'react';
import './AnimalForm.css'

const AnimalForm = props => {
  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={props.handleFieldChange}
              id="name"
              placeholder="Animal name"
            />
            <label htmlFor="animalName">Name</label>
            <input
              type="text"
              required
              onChange={props.handleFieldChange}
              id="breed"
              placeholder="Breed"
            />
            <label htmlFor="breed">Breed</label>
          <select
              className="form-control"
              required
              id="employeeId"
              onChange={props.handleFieldChange}
            >
              {props.employees.map(employee => (
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
              disabled={props.isLoading}
              onClick={(evt) => {
                const constructedAnimal = props.constructAnimal(evt);
                props.saveAnimal(constructedAnimal)
              }}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AnimalForm