import React from "react";

const OwnerCard = prop => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-ownername">
            {prop.owner.name}
          </span>
        </h3>
        <p>Phone Number: {prop.owner.phoneNumber}</p>
      </div>
    </div>
  );
};

export default OwnerCard;