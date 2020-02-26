import React from "react";
import { Link } from "react-router-dom"
import "./Owner.css"

const OwnerCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          Name: <span className="card-ownername">
            {props.owner.name}
          </span>
        </h3>
        <p>Phone Number: {props.owner.phoneNumber}</p>
        <button type="button" onClick={() => props.deleteOwner(props.owner.id)}>Remove Owner</button>
        <Link to={`/owners/${props.owner.id}`}>
          <button>Details</button>
        </Link>
        <button
          type="button"
          onClick={() => props.history.push(`/owners/${props.owner.id}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default OwnerCard;