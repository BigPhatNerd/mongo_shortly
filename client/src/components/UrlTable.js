import React, { useState } from 'react';
import { Container, Row, Table, Form } from "react-bootstrap";
import axios from 'axios';
import { toast } from "react-toastify";


const UrlTable = ({urls, count, increment}) =>{

 const registerClick = async (e) => {
   try {
     const redirect = await axios.get(`/urls/${e.target.innerText}`);
     if (redirect.status === 200) {
       increment();
       // window.location.href = e.target.id
       window.open(e.target.id, "_blank");
       return
     }
   } catch (err) {
     toast.error("😢 It's not you, it's us. 😢", {
       backgroundColor: "black",
     });
   }
 };
console.log({count})
  const listTable = urls.map(({full, short, clicks}) =>{
   
    return (
      <tr key={short}>
        
        <td>{full}</td>
        <td style={{color: 'red', textDecoration: 'underline' }} id={full} onClick={registerClick}>{short}</td>
        <td>{clicks}</td>
      </tr>
    );
  })
	return (
    <Table striped bordered hover variant="dark" size='small' >
      <thead>
        <tr>
          
          <th>Full URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
       {listTable}
      </tbody>
    </Table>
  );
}

export default UrlTable;