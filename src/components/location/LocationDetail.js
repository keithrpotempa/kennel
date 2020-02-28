import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import { handleDelete } from '../../modules/helpers';
import './LocationDetail.css'

//TODO: I believe this is deprecated now that LocationWithEmployee exists..

const LocationDetail = props => {
  const [location, setLocation] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiManager.get("locations", props.locationId)
      .then(location => {
        setLocation({
          name: location.name,
          address: location.address
        });
        setIsLoading(false);
      });
  }, [props.locationId]);

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{location.name}</span></h3>
        <p>Location: {location.address}</p>
        <button type="button" disabled={isLoading} onClick={() => {
          setIsLoading(true);
          handleDelete("locations", props.locationId, props);
        }}>
          Close Location
        </button>
      </div>
    </div>
  );
}

export default LocationDetail;