import React from "react";

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
      </div>
    </div>
  );
};

export default LocationCard;