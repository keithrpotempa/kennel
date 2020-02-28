import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './EmployeeForm.css'

const EmployeeForm = props => {
  const [employee, setEmployee] = useState({ name: "", role: "" });
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...employee };
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const getLocations = () => {
    return ApiManager.getAll("locations")
      .then(locations => {
        setLocations(locations);
      });
  }

  /*  Local method for validation, set loadingStatus, create animal      
      object, invoke the AnimalManager post method, and redirect to the full animal list
  */
  const constructNewEmployee = evt => {
    evt.preventDefault();
    if (employee.name === "" || employee.role === "") {
      window.alert("Please input an employee name and role");
    } else {
      setIsLoading(true);
      // Create the animal and redirect user to animal list
      ApiManager.post("employees", employee)
        .then(() => props.history.push("/employees"));
    }
  };

  useEffect(()=>{
    getLocations();
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
            />
            <label htmlFor="employeeName">Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="role"
              placeholder="Role"
            />
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              required
              id="locationId"
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
              onClick={constructNewEmployee}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EmployeeForm