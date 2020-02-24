import React from "react";
import { Link } from "react-router-dom"

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
        <Link to={`/employees/${props.employee.id}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;