import React, { useState, useEffect } from 'react';
import OwnerCard from './OwnerCard';
import ApiManager from '../../modules/ApiManager';

const OwnerList = props => {
  const [owners, setOwners] = useState([]);

  const getOwners = () => {
    return ApiManager.getAll("owners").then(ownersFromAPI => {
      setOwners(ownersFromAPI)
    });
  };

  useEffect(() => {
    getOwners();
  }, []);

  return (
    <>
      <section className="section-content">
        <button type="button"
            className="btn"
            onClick={() => {props.history.push("/owners/new")}}>
            Add New Owner
        </button>
      </section>
      <div className="container-cards">
        {owners.map(owner => 
          <OwnerCard 
            key={owner.id} 
            owner={owner}
            handleDelete={() => {
              ApiManager.delete("owners", owner.id)
                .then(getOwners);
            }}
            {...props} 
          />)}
      </div>
    </>
  );
};
export default OwnerList