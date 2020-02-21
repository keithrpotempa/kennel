import React from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";

import "./Kennel.css";
import EmployeeCard from "./employee/EmployeeCard";
import LocationCard from "./location/LocationCard";
import OwnerCard from "./owner/OwnerCard";

const Kennel = () => {
  return (
    <>
      <NavBar />
      <ApplicationViews />
      <LocationCard/>
      <OwnerCard/>
      <EmployeeCard/>
    </>
  );
};

export default Kennel;