import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import ApiManager from '../../modules/ApiManager';

const EmployeeList = props => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    return ApiManager.getAll("employees").then(employeesFromAPI => {
      setEmployees(employeesFromAPI)
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const deleteEmployee = id => {
    ApiManager.delete("employees", id)
      .then(() => ApiManager.getAll().then(setEmployees));
  };

  return(
    <>
      <section className="section-content">
        <button type="button"
            className="btn"
            onClick={() => {props.history.push("/employees/new")}}>
            Hire Employee
        </button>
      </section>
      <div className="container-cards">
        {employees.map(employee =>
          <EmployeeCard 
            key={employee.id} 
            employee={employee}
            deleteEmployee={deleteEmployee} 
            {...props}
          />
        )}
      </div>
    </>
  );
};
export default EmployeeList