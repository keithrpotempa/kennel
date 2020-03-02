import React, { useState, useEffect } from "react";
import ApiManager from "../modules/ApiManager";
import AnimalCard from "../components/animal/AnimalCard"
import EmployeeCard from "../components/employee/EmployeeCard";
import LocationCard from "../components/location/LocationCard";
import OwnerCard from "../components/owner/OwnerCard";

const SearchResults = props => {
  const [employees, setEmployees] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [locations, setLocations] = useState([]);
  const [owners, setOwners] = useState([]);

  const getAllResults = (query) => {
    ApiManager.searchXWithOneY("animals", "employee", query).then(results => setAnimals(results));
    ApiManager.searchXWithOneY("employees", "location", query).then(results => setEmployees(results));
    ApiManager.search("locations", query).then(results => setLocations(results));
    ApiManager.search("owners", query).then(results => setOwners(results));
  }

  useEffect(() => {
    getAllResults(props.search);
  }, [props.match.params, props.search]);
  //props.match.params added here so that if the url changes
  //even when the user is on the search page
  //it re-renders

  //TODO: getAllResults may not be the best way of handling a delete...
  return (
    <>
      <h3>Search results for: {props.search}</h3>
        {
          animals.length > 0 &&
          <>
            <h1>Matching Animals</h1>
            <div className="container-cards">
              {animals.map(animal => 
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  handleDelete={() => {
                    ApiManager.delete("animals", animal.id)
                      .then(getAllResults(props.search))
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
                  employeeLocation={employee.location}
                  handleDelete={() => {
                    ApiManager.delete("employees", employee.id)
                      .then(getAllResults(props.search))
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
                  handleDelete={() => {
                    ApiManager.delete("locations", location.id)
                      .then(getAllResults(props.search))
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
                  handleDelete={() => {
                    ApiManager.delete("owners", owner.id)
                      .then(getAllResults(props.search))
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
