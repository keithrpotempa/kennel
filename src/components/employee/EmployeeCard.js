import React from "react";
import { handleDeleteEmployee } from '../../modules/helpers'
import "./Employee.css";

const EmployeeCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-employeename">{props.employee.name}</span>
        </h3>
        <p>Role: {props.employee.role}</p>
        <p>Location: {props.employee.location.name}</p>
        <button
          type="button"
          onClick={() => handleDeleteEmployee(props)}
        >
          Fire Employee
        </button>
        <button
          type="button"
          onClick={() => {
            props.history.push(`/employees/${props.employee.id}/details`);
          }}
        >
          Details
        </button>
        <button
          type="button"
          onClick={() =>
            props.history.push(`/employees/${props.employee.id}/edit`)
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
