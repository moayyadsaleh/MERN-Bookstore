import { Link } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";
import React from "react";

const backButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link></Link>
    </div>
  );
};

export default backButton;
