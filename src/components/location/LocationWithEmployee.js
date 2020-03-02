import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'
import EmployeeCard from '../employee/EmployeeCard'

const LocationWithEmployees = props => {
  const [location, setLocation] = useState({});
  const [employees, setEmployees] = useState([]);

  const getLocationAndEmployees = () => {
    ApiManager.getOneXWithManyY("locations", "employees", props.match.params.locationId)
      .then(APIResult => {
        setLocation(APIResult);
        setEmployees(APIResult.employees);
      });
  } 

  useEffect(() => {
    getLocationAndEmployees();
  }, []);

  return (
    <div className="card">
      <p>Location: {location.name}</p>
      {employees.map(employee =>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          employeeLocation={location}
          handleDelete={() => {
            ApiManager.delete("employees", employee.id)
              .then(getLocationAndEmployees)
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default LocationWithEmployees;