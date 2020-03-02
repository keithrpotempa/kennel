import React, { useState, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'
import EmployeeCard from '../employee/EmployeeCard'

const LocationWithEmployees = props => {
  const [location, setLocation] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    ApiManager.getOneXWithManyY("locations", "employees", props.match.params.locationId)
      .then(APIResult => {
        console.log(APIResult)
        setLocation(APIResult);
        setEmployees(APIResult.employees);
      });
  }, []);

  return (
    <div className="card">
      <p>Location: {location.name}</p>
      {employees.map(employee =>
        <EmployeeCard
          key={employee.id}
          employee={employee}
          employeeLocation={location}
          {...props}
        />
      )}
    </div>
  );
};

export default LocationWithEmployees;