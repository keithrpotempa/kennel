import React from "react";

const LocationCard = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-location">Downtown</span>
        </h3>
        <p>Address: 123 Downtown</p>
      </div>
    </div>
  );
};

export default LocationCard;