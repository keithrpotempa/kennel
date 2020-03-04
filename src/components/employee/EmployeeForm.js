import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './EmployeeForm.css'

// EmployeeForm serves as both new and edit forms

const EmployeeForm = props => {
  const [employee, setEmployee] = useState({ name: "", role: "", locationId: ""});
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const getLocations = () => {
    return ApiManager.getAll("locations")
      .then(locations => setLocations(locations));
  }

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const constructEmployee = evt => {
    evt.preventDefault();
    if (employee.name === "" || employee.role === "") {
      window.alert("Please input an employee name and role");
    } else {
      setIsLoading(true);
      const employeeToSave = {
        name: employee.name,
        role: employee.role,
        locationId: parseInt(employee.locationId)
      }
      // If this is an edit, we also need the id
      if (props.match.params.employeeId) {
        employeeToSave.id = props.match.params.employeeId;
      }
      return employeeToSave;
    }
  };

  const saveEmployee = employee => {
    // If the object has an id, it is an edit,
    // so we put/update
    if (employee.hasOwnProperty('id')) {
      ApiManager.update("employees", employee)
        .then(props.history.push("/employees"))
    // Otherwise, it is new, so we post
    } else {
      ApiManager.post("employees", employee)
        .then(props.history.push("/employees"))
    }

  }

  useEffect(()=>{
    getLocations();
    // If this is an edit, we need to get the entry-to-edit's details
    if (props.match.params.employeeId) {
      ApiManager.get("employees", props.match.params.employeeId)
        .then(employee => setEmployee(employee))
      setIsLoading(false);
    }
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
              placeholder="Employee name"
              value={employee.name}
            />
            <label htmlFor="employeeName">Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="role"
              placeholder="Role"
              value={employee.role}
            />
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              required
              id="locationId"
              value={employee.locationId}
              onChange={handleFieldChange}
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <label htmlFor="locationId">Location</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={(evt) => {
                const constructedEmployee = constructEmployee(evt);
                saveEmployee(constructedEmployee);
              }}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EmployeeForm