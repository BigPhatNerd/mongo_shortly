import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Container, Row, Form, Button } from "react-bootstrap";
import UrlTable from "./components/UrlTable";
import "./App.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import toast from "./components/Toast";

function App() {
  const [formData, setFormData] = useState({ full: "" });
  const [urlList, setUrlList] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [count, setCount] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [shortenedLink, setShortenedLink] = useState('');

  const { full } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisableButton(false);
  };
  const increment = () => setCount(count + 1);

  useEffect(() => {
    const getUrls = async () => {
      try {
        const res = await axios.get("/urls");

        if (res.data.error) {
          toast.warn(res.data.error);
        }
        setUrlList(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUrls();
  }, [count]);
  
 const countClick = async (e) => {
   try {
     const redirect = await axios.get(`/urls/${e.target.innerText}`);
     if (redirect.status === 200) {
       increment();
       // window.location.href = e.target.id
       window.open(e.target.id, "_blank");
       return;
     }
   } catch (err) {
     toast.error("😢 It's not you, it's us. 😢", {
       backgroundColor: "black",
     });
   }
 };
  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/shortUrls", formData, config);
      //add my toast and error handling

      if (res.data.error) {
        setFormData({ full: "" });
        toast.warn(res.data.error);
        setShortenedLink('');

        return;
      }
      setUrlList((prevState) => [res.data, ...prevState]);
      setFormData({ full: "" });
      setDisableButton(false);
      setShortenedLink(res.data)
    } catch (err) {
      
      //add error handling

      toast.error("😢 It's not you, it's us. 😢", { backgroundColor: "black" });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Container className="pt-3 ">
        <Row className="justify-content-center mt-5">
          <h1>URL Shortener</h1>
        </Row>
        <Row className="justify-content-center">
          Enter url to be shortened...
        </Row>
        <Row className="justify-content-center mb-3">
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
              disabled={disableButton || formData.full === ""}
            >
              Submit
            </Button>
          </Form>
        </Row>
     {  shortenedLink !== '' && <Row className="justify-content-center mb-3">
          <h3>Here is your url:  <span id={shortenedLink.full} onClick={countClick} style={{color: 'grey', textDecoration: 'underline'}}>{shortenedLink.short}</span></h3>
        </Row> }

        <Row className="justify-content-center mb-3">
          <p
            onClick={() => setShowTable(!showTable)}
            style={{ letterSpacing: "1px" }}
          >
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
                Show previous url's{" "}
                <span role="img" aria-label="finger-left">
                  👈{" "}
                </span>{" "}
              </>
            )}
          </p>
        </Row>
        {showTable && (
          <UrlTable urls={urlList} increment={increment} count={count} />
        )}
      </Container>
    </>
  );
}

export default App;
