import React from "react";
import { Link } from "react-router-dom";

const LocationCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-location">
          {props.location.name}
            </span>
        </h3>
        <p>Address: {props.location.address}</p>
        <button onClick={() => props.deleteLocation(props.location.id)}>Close Location</button>
        <Link to={`/locations/${props.location.id}`}>
          <button>Location Details</button>
        </Link>
      </div>
    </div>
  );
};

export default LocationCard;