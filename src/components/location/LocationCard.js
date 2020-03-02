import React from "react";
import { Link } from "react-router-dom";
import "./Location.css"

const LocationCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-location">
          {props.locationObject.name}
            </span>
        </h3>
        <p>Address: {props.locationObject.address}</p>
        <button onClick={props.handleDelete}>
          Close Location
        </button>
        <Link to={`/locations/${props.locationObject.id}/details`}>
          <button>Details</button>
        </Link>
        <button
          type="button"
          onClick={() => props.history.push(`/locations/${props.locationObject.id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default LocationCard;