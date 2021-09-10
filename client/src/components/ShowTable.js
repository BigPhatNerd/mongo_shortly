import React, { useContext } from "react";
import AppContext from "../context/app/appContext";

const ShowTable = () => {
  const appContext = useContext(AppContext);
  const { showTable, removeLink } = appContext;

  return (
    <h5 onClick={removeLink} style={{ letterSpacing: "1px" }}>
      {showTable ? (
        <>
          <span role="img" aria-label="finger-down">
            👇{" "}
          </span>
          Close table{" "}
          <span role="img" aria-label="finger-down">
            👇
          </span>
        </>
      ) : (
        <>
          <span role="img" aria-label="finger-right">
            👉{" "}
          </span>{" "}
          Show all url's{" "}
          <span role="img" aria-label="finger-left">
            👈{" "}
          </span>{" "}
        </>
      )}
    </h5>
  );
};

export default ShowTable;
