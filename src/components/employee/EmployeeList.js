import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import ApiManager from '../../modules/ApiManager';

const EmployeeList = props => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = () => {
    return ApiManager.getAllXWithTheirOneY("employees", "location").then(employeesFromAPI => {
      setEmployees(employeesFromAPI)
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

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
            employeeLocation={employee.location}
            handleDelete={() => {
              ApiManager.delete("employees", employee.id, props)
                .then(getEmployees)}
            }
            {...props}
          />
        )}
      </div>
    </>
  );
};
export default EmployeeList