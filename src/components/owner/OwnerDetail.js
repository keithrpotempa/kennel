import React, { useState, useEffect } from 'react';
import OwnerManager from '../../modules/OwnerManager';
import './OwnerDetail.css'

const OwnerDetail = props => {
  const [owner, setOwner] = useState({ name: "", phoneNumber: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    OwnerManager.get(props.ownerId)
      .then(owner => {
        setOwner({
          name: owner.name,
          phoneNumber: owner.phoneNumber
        });
        setIsLoading(false);
      });
  }, [props.ownerId]);

  const handleDelete = () => {
    setIsLoading(true);
    OwnerManager.deleteOwner(props.ownerId).then(() =>
      props.history.push("/owners")
    );
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{owner.name}</span></h3>
        <p>Phone Number: {owner.phoneNumber}</p>
        <button type="button" disabled={isLoading} onClick={handleDelete}>
          Remove Owner
        </button>
      </div>
    </div>
  );
}

export default OwnerDetail;