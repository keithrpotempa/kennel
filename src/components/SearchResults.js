import React, { useState, useEffect } from "react";
import ApiManager from "../modules/ApiManager";
import AnimalCard from "../components/animal/AnimalCard"
import {handleDelete} from "../modules/helpers"
import EmployeeCard from "../components/employee/EmployeeCard";
import LocationCard from "../components/location/LocationCard";
import OwnerCard from "../components/owner/OwnerCard";

const SearchResults = props => {
  const [employees, setEmployees] = useState([]) 
  const [animals, setAnimals] = useState([]) 
  const [locations, setLocations] = useState([]) 
  const [owners, setOwners] = useState([]) 

  const getAnimals = (query) => {
    return ApiManager.search("animals", query)
      .then(results => setAnimals(results));
  }

  const getEmployees = (query) => {
    return ApiManager.search("employees", query)
      .then(results => setEmployees(results));
  }

  const getLocations = (query) => {
    ApiManager.search("locations", query)
      .then(results => setLocations(results));

  }

  const getOwners = (query) => {
    ApiManager.search("owners", query)
      .then(results => setOwners(results));
  }

  const getAllResults = (query) => {
    getAnimals(query);
    getEmployees(query);
    getLocations(query);
    getOwners(query);
  }

  useEffect(() => {
    getAllResults(props.search);
  }, [props.match.params]);
  //props.match.params added above so that if the url changes
  //even when the user is on the search page
  //it re-renders

  return (
    <>
      <h3>Search results for: "{props.search}"</h3>
        {
          animals.length > 0 &&
          <>
            <h1>Matching Animals</h1>
            <div className="container-cards">
              {animals.map(animal => 
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  deleteAnimal={() => {
                    handleDelete("animals", animal.id, props);
                  }} 
                  {...props}
                />          
              )}
            </div>
          </>
        }
        {
          employees.length > 0 && 
          <>
            <h1>Matching Employees</h1>
            <div className="container-cards">
              {employees.map(employee =>
                <EmployeeCard 
                  key={employee.id} 
                  employee={employee}
                  deleteEmployee={() => {
                    handleDelete("employees", employee.id, props);
                  }} 
                  {...props}
                />
              )}
            </div>
          </>
        }
        {
          locations.length > 0 && 
          <>
            <h1>Matching Locations</h1>
            <div className="container-cards">
              {locations.map(location =>
                <LocationCard 
                  key={location.id} 
                  locationObject={location}
                  deleteLocation={() => {
                    handleDelete("locations", location.id, props);
                  }} 
                  {...props}
                />
              )}
            </div>
          </>
        }
        {
          owners.length > 0 && 
          <>
            <h1>Matching Owners</h1>
            <div className="container-cards">
              {owners.map(owner =>
                <OwnerCard 
                  key={owner.id} 
                  owner={owner}
                  deleteOwner={() => {
                    handleDelete("owners", owner.id, props);
                  }} 
                  {...props}
                />
              )}
            </div>
          </>
        }
    </>
  )
}

export default SearchResults;
