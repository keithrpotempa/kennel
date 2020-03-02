import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './EmployeeDetail.css'

// THIS IS DEPRECATED(?) NOW THAT EMPLOYEEWITHANIMALS EXISTS
const EmployeeDetail = props => {
  const [employee, setEmployee] = useState({ name: "", role: "" });
  const [isLoading, setIsLoading] = useState({isLoading: true})

  useEffect(() => {
    ApiManager.get("employees", props.employeeId)
      .then(employee => {
        setEmployee({
          name: employee.name,
          role: employee.role
        });
        setIsLoading(false);
      });
  }, [props.employeeId]);

  const handleDelete = () => {
    setIsLoading(true);
    ApiManager.delete("employees", props.employeeId).then(() => 
      props.history.push("/employees")
    );
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{employee.name}</span></h3>
        <p>Role: {employee.role}</p>
      </div>
      <button type="button" disabled={isLoading} onClick={handleDelete}>
        Fire Employee
      </button>
    </div>
  );
}

export default EmployeeDetail;