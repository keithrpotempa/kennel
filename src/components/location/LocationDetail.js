import React, { useState, useEffect } from 'react';
import LocationManager from '../../modules/LocationManager';
import './LocationDetail.css'

const LocationDetail = props => {
  const [location, setLocation] = useState({ name: "", address: "" });

  useEffect(() => {
    LocationManager.get(props.locationId)
      .then(location => {
        setLocation({
          name: location.name,
          address: location.address
        });
      });
  }, [props.locationId]);

  return (
    <div className="card">
      <div className="card-content">
        <h3>Name: <span style={{ color: 'darkslategrey' }}>{location.name}</span></h3>
        <p>Location: {location.address}</p>
      </div>
    </div>
  );
}

export default LocationDetail;