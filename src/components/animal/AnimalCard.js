import React from "react";
import { Link } from "react-router-dom";
import "./Animal.css";

const AnimalCard = props => {
  // Hacky way of getting around the difference in info between
  // EmployeeWithAnimals and Animal* components
  let employeeJSX;
  if ("employee" in props.animal) {
    employeeJSX = props.animal.employee.name
  } else if ("employee" in props) {
    employeeJSX = props.employee.name
  }

  return (
    <div className="card">
      <div className="card-content">
        <picture>
          <img src={require("./dog.svg")} alt="My Dog" />
        </picture>
        <h3>
          Name: <span className="card-petname">{props.animal.name}</span>
        </h3>
        <p>Breed: {props.animal.breed}</p>
        <p>Employee: {employeeJSX}</p>
        <p>Owner(s):</p> 
        <ul>
          {props.animalOwners.map(animalOwner => 
            <li> {animalOwner.owner.name} </li>
          )}
        </ul>
        <button
          type="button"
          onClick={props.handleDelete}
        >
          Discharge
        </button>
        <Link to={`/animals/${props.animal.id}`}>
          <button>Details</button>
        </Link>
        <button
          type="button"
          onClick={() => props.history.push(`/animals/${props.animal.id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;
