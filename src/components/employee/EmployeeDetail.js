import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import { handleDelete } from '../../modules/helpers'
import './EmployeeDetail.css'

//TODO: I suspect this file is deprecated, now that EmployeeWithAnimal exists?

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

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{employee.name}</span></h3>
        <p>Role: {employee.role}</p>
      </div>
      <button type="button" disabled={isLoading} onClick={() => {
        setIsLoading(true);
        handleDelete("employees", props.employeeId, props);
      }}>
        Fire Employee
      </button>
    </div>
  );
}

export default EmployeeDetail;