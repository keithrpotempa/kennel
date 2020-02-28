import React, { useState, useEffect } from 'react';
import LocationCard from './LocationCard';
import ApiManager from '../../modules/ApiManager';

const LocationList = props => {
  const [locations, setLocations] = useState([]);

  const getLocations = () => {
    return ApiManager.getAll("locations").then(locationsFromAPI => {
      setLocations(locationsFromAPI)
    });
  };

  useEffect(() => {
    getLocations();
  }, []);

  const deleteLocation = id => {
    ApiManager.delete("locations", id)
      .then(() => ApiManager.getAll("locations").then(setLocations));
  };

  return (
    <>
      <section className="section-content">
        <button type="button"
            className="btn"
            onClick={() => {props.history.push("/locations/new")}}>
            Add Location
        </button>
      </section>
      <div className="container-cards">
        {locations.map(location => 
          <LocationCard 
            key={location.id} 
            locationObject={location}
            deleteLocation={deleteLocation}
            {...props}
          />
        )}
      </div>
    </>
  );
};
export default LocationList