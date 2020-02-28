import React, { useState, useEffect } from "react";
import ApiManager from "../modules/ApiManager";
import AnimalCard from "../components/animal/AnimalCard"
import {handleDeleteAnimal, handleDeleteEmployee} from "../modules/helpers"
import EmployeeCard from "../components/employee/EmployeeCard";
import LocationCard from "../components/location/LocationCard";
import OwnerCard from "../components/owner/OwnerCard";

const SearchResults = props => {
  const [employees, setEmployees] = useState([]) 
  const [animals, setAnimals] = useState([]) 
  const [locations, setLocations] = useState([]) 
  const [owners, setOwners] = useState([]) 

  const getAllResults = (query) => {
    ApiManager.search("animals", query).then(results => setAnimals(results));
    ApiManager.search("employees", query).then(results => setEmployees(results));
    ApiManager.search("locations", query).then(results => setLocations(results));
    ApiManager.search("owners", query).then(results => setOwners(results));
  }

  useEffect(() => {
    getAllResults(props.search);
  }, [props.match.params]);
  //props.match.params added here so that if the url changes
  //even when the user is on the search page
  //it re-renders

  //FIXME: this "conditional" with the JSX isn't working
  //TODO: getAllResults may not be the best way of handling a delete...
  return (
    <>
      <h3>Search results for: {props.search}</h3>
        {
          animals &&
          <>
            <h1>Matching Animals</h1>
            <div className="container-cards">
              {animals.map(animal => 
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  deleteAnimal={() => {
                    handleDeleteAnimal(animal.id)
                      .then(getAllResults);
                  }} 
                  {...props}
                />          
              )}
            </div>
          </>
        }
        {
          employees && 
          <>
            <h1>Matching Employees</h1>
            <div className="container-cards">
              {employees.map(employee =>
                <EmployeeCard 
                  key={employee.id} 
                  employee={employee}
                  deleteEmployee={() => {
                    handleDeleteEmployee(employee.id)
                      .then(getAllResults);
                  }} 
                  {...props}
                />
              )}
            </div>
          </>
        }
        {
          locations && 
          <>
            <h1>Matching Locations</h1>
            <div className="container-cards">
              {locations.map(location =>
                <LocationCard 
                  key={location.id} 
                  locationObject={location}
                  deleteLocation={() => {
                    //FIXME: this function hasn't been lifted
                  }} 
                  {...props}
                />
              )}
            </div>
          </>
        }
        {
          owners && 
          <>
            <h1>Matching Owners</h1>
            <div className="container-cards">
              {owners.map(owner =>
                <OwnerCard 
                  key={owner.id} 
                  owner={owner}
                  deleteOwner={() => {
                    //FIXME: this function hasn't been lifted
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
