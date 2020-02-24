import React, { useState, useEffect } from 'react';
import EmployeeManager from '../../modules/EmployeeManager';
import './EmployeeDetail.css'

const EmployeeDetail = props => {
  const [employee, setEmployee] = useState({ name: "", role: "" });

  useEffect(() => {
    //get(id) from AnimalManager and hang on to the data; put it into state
    EmployeeManager.get(props.employeeId)
      .then(employee => {
        setEmployee({
          name: employee.name,
          role: employee.role
        });
      });
  }, [props.employeeId]);

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{employee.name}</span></h3>
        <p>Role: {employee.role}</p>
      </div>
    </div>
  );
}

export default EmployeeDetail;