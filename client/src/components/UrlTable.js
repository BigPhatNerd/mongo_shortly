import React, { useState, useContext } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import AppContext from "../context/app/appContext";


const UrlTable = () => {
  const appContext = useContext(AppContext);
  const { urlList, registerClick } = appContext
  console.log("UrlTable: ", appContext)
 
  
  const listTable = urlList.map(({ full, short, clicks }) => {
    {console.log("UrlTable: ", appContext)}
    return (
      <tr key={short}>
        <td style={{display: 'block',
  width: '50vw',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'}}>{full}</td>
        <td
          style={{ color: "red", textDecoration: "underline" }}
          id={full}
          onClick={registerClick}
        >
          {short}
        </td>
        <td>{clicks}</td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover variant="dark" size="small">
      <thead>
        <tr>
          <th className="w-50">Full URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>{listTable}</tbody>
    </Table>
  );
};

export default UrlTable;
