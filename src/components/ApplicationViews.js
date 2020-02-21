import { Route } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import AnimalCard from "./animal/AnimalCard";
import OwnerCard from "./owner/OwnerCard"
import EmployeeCard from "./employee/EmployeeCard"
import LocationCard from "./location/LocationCard"

const ApplicationViews = () => {
  return (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={props => {
          return <Home />;
        }}
      />
      <Route
        path="/animals"
        render={props => {
          return <AnimalCard />;
        }}
      />
      <Route
        path="/locations"
        render={props => {
          return <LocationCard />;
        }}
      />
      <Route
        path="/owners"
        render={props => {
          return <OwnerCard />;
        }}
      />
			<Route
        path="/employees"
        render={props => {
          return <EmployeeCard />;
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;