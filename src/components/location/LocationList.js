import React, { useState, useEffect } from 'react';
import LocationCard from './LocationCard';
import LocationManager from '../../modules/LocationManager';

const LocationList = () => {
  const [locations, setLocation] = useState([]);

  const getLocation = () => {
    return LocationManager.getAll().then(locationFromAPI => {
      setLocation(locationFromAPI)
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const deleteLocation = id => {
    LocationManager.delete(id)
      .then(() => LocationManager.getAll().then(setLocation));
  };

  return (
    <div className="container-cards">
      {locations.map(location => 
        <LocationCard 
        key={location.id} 
        location={location}
        deleteLocation={deleteLocation}/>
      )}
    </div>
  );
};
export default LocationList