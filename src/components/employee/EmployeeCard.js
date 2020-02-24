import React from "react";

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
      </div>
    </div>
  );
};

export default EmployeeCard;