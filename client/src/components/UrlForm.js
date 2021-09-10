import React, {useEffect, useContext, useState } from 'react';
import { Button } from "react-bootstrap";
import AppContext from "../context/app/appContext";
import { Form } from "react-bootstrap";
const UrlForm = () =>{
	const appContext = useContext(AppContext);
	console.log('UrlForm: ', appContext)
	const { submitURL, formOnChange, formData, disableButton } = appContext;
 
const {full } = formData;
	//  const [formData, setFormData] = useState({ full: "" });
	//  const { full } = formData
	//  const [disableButton, setDisableButton] = useState(true);
	const onChange = (e) => {
    formOnChange(e)
  };


  const onSubmit = async (e) => {
    e.preventDefault();
	submitURL(formData);
  };

return (
  <Form inline onSubmit={onSubmit}>
    <Form.Group controlId="formBasicUrl">
      <Form.Control
        onChange={(e) => onChange(e)}
        value={full}
        name="full"
        type="name"
        placeholder="https://example.com"
      ></Form.Control>
    </Form.Group>

    <Button
      variant="primary"
      type="submit"
      disabled={disableButton || full === ""}
    >
      Submit
    </Button>
  </Form>
);
}

export default UrlForm;