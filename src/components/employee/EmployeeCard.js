import React from "react";
import "./Employee.css";

const EmployeeCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-employeename">
            {props.employee.name}
          </span>
        </h3>
        <p>Role: {props.employee.role}</p>
        <button type="button" onClick={() => props.deleteEmployee(props.employee.id)}>Fire Employee</button>
        <button type="button"
          onClick={() => { props.history.push(`/employees/${props.employee.id}/details`) }}>Details</button>
        <button
          type="button"
          onClick={() => props.history.push(`/employees/${props.employee.id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;