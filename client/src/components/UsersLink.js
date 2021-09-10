import React, { useContext } from "react";

import AppContext from "../context/app/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const UsersLink = () => {
  const appContext = useContext(AppContext);
  const { increment, shortenedLink, handleCountClick, formData } = appContext;
  console.log("UrlTable: ", appContext);

  const countClick = (e) => {
    handleCountClick(e, increment);
  };
  
  return (
   
      <h3>
        Here is your url:{" "}
        <span
          id={shortenedLink.full}
          onClick={countClick}
          style={{ color: "grey", textDecoration: "underline" }}
        >
          {shortenedLink.short}
        </span>
      </h3>
   
  );
};

export default UsersLink;
