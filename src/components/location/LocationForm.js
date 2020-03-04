import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './LocationForm.css'

// LocationForm serves as both new and edit forms

const LocationForm = props => {
  const [location, setLocation] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...location };
    stateToChange[evt.target.id] = evt.target.value;
    setLocation(stateToChange);
  };

  const constructLocation = evt => {
    evt.preventDefault();
    if (location.name === "" || location.address === "") {
      window.alert("Please input a location name and address");
    } else {
      setIsLoading(true);
      const locationToSave = {
        name: location.name,
        address: location.address
      }
      // If this is an edit, we also need the id
      if (props.match.params.locationId) {
        locationToSave.id = props.match.params.locationId;
      }
      return locationToSave;
    }
  };

  const saveLocation = location => {
    // If the object has an id, it is an edit,
    // so we put/update
    if (location.hasOwnProperty('id')) {
      ApiManager.update("locations", location)
        .then(props.history.push("/locations"))
    // Otherwise, it is new, so we post
    } else {
      ApiManager.post("locations", location)
        .then(props.history.push("/locations"))
    }
  }

  useEffect(()=> {
    // If this is an edit, we need to get the entry-to-edit's details
    if (props.match.params.locationId) {
      ApiManager.get("locations", props.match.params.locationId)
        .then(location => setLocation(location))
      setIsLoading(false);
    }
  }, [])


  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Location name"
              value={location.name}
            />
            <label htmlFor="locationName">Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="address"
              placeholder="address"
              value={location.address}
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={(evt) => {
                const constructedLocation = constructLocation(evt);
                saveLocation(constructedLocation);
              }}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LocationForm