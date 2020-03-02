import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './OwnerDetail.css'

const OwnerDetail = props => {
  const [owner, setOwner] = useState({ name: "", phoneNumber: "" });
  const [isLoading, setIsLoading] = useState(true);

  const getOwner = () => {
    ApiManager.get("owners", props.ownerId)
      .then(owner => {
        setOwner({
          name: owner.name,
          phoneNumber: owner.phoneNumber
        });
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getOwner();
  }, [props.ownerId]);

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{owner.name}</span></h3>
        <p>Phone Number: {owner.phoneNumber}</p>
        <button type="button" disabled={isLoading} onClick={() => {
          ApiManager.delete("owners", props.ownerId)
            .then(props.history.push("/owners"))
        }}>
          Remove Owner
        </button>
      </div>
    </div>
  );
}

export default OwnerDetail;