import React from "react";

const EmployeeCard = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-employeename">Peter</span>
        </h3>
        <p>Role: Wrangler</p>
      </div>
    </div>
  );
};

export default EmployeeCard;