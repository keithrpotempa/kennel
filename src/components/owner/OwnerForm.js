import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import './OwnerForm.css'

// OwnerForm serves as both new and edit forms

const OwnerForm = props => {
  const [owner, setOwner] = useState({ name: "", phoneNumber: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...owner };
    stateToChange[evt.target.id] = evt.target.value;
    setOwner(stateToChange);
  };

  const constructOwner = evt => {
    evt.preventDefault();
    if (owner.name === "" || owner.phoneNumber === "") {
      window.alert("Please input an owner name and phone number");
    } else {
      setIsLoading(true);
      const ownerToSave = {
        name: owner.name,
        phoneNumber: owner.phoneNumber
      }
      // If this is an edit, we also need the id
      if (props.match.params.ownerId) {
        ownerToSave.id = props.match.params.ownerId;
      }
      return ownerToSave;
    }
  };

  const saveOwner = owner => {
    // If the object has an id, it is an edit,
    // so we put/update
    if (owner.hasOwnProperty('id')) {
      ApiManager.update("owners", owner)
        .then(props.history.push("/owners"))
    // Otherwise, it is new, so we post
    } else {
      ApiManager.post("owners", owner)
        .then(props.history.push("/owners"))
    }

  }

  useEffect(()=>{
    // If this is an edit, we need to get the entry-to-edit's details
    if (props.match.params.ownerId) {
      ApiManager.get("owners", props.match.params.ownerId)
        .then(owner => setOwner(owner))
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
              placeholder="Owner name"
              value={owner.name}
            />
            <label htmlFor="ownerName">Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="phoneNumber"
              placeholder="Phone Number"
              value={owner.phoneNumber}
            />
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={(evt) => {
                const constructedOwner = constructOwner(evt);
                saveOwner(constructedOwner);
              }}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default OwnerForm