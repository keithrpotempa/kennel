import React from "react";

const OwnerCard = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-ownername">Owny McOwner</span>
        </h3>
        <p>Role: Owner</p>
      </div>
    </div>
  );
};

export default OwnerCard;