import React, { useState, useEffect } from 'react'
import LocationManager from '../../modules/LocationManager'
import EmployeeCard from '../employee/EmployeeCard'

const LocationWithEmployees = props => {
  const [location, setLocation] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    LocationManager.getWithEmployees(props.match.params.locationId)
      .then(APIResult => {
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
          location={location}
          {...props}
        />
      )}
    </div>
  );
};

export default LocationWithEmployees;