import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import { Container, Row, Form, Button } from "react-bootstrap";
import UrlTable from "./components/UrlTable";
import BounceUsersLink from "./components/BounceUsersLink";
import UsersLink from "./components/UsersLink";
import NoUrls from "./components/NoUrls";
import UrlForm from "./components/UrlForm";
import ShowTable from "./components/ShowTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./context/app/appContext";

const AppChild = () => {
  const appContext = useContext(AppContext);
  const { getUrls,count, shortenedLink, urlList, showTable, hasBounced } = appContext;
  console.log("AppChild: ", appContext);

  useEffect(() =>{
getUrls()
  },[count])

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
          <UrlForm />
        </Row>
        {console.log('appContext: ', appContext)}
        {(shortenedLink !== "" && !hasBounced) ? (
          <Row className="justify-content-center mb-3">
            <BounceUsersLink />
          </Row>
        ) : (shortenedLink && shortenedLink !== "") ? ( <Row className="justify-content-center mb-3">
            <UsersLink />
          </Row>) : (null)}
        
         
        

        
        {urlList.length === 0 ? (
          <Row className="justify-content-center mb-3">
            <NoUrls />
          </Row>
        ) : (
          <Row className="justify-content-center mb-3">
            <ShowTable />
          </Row>
        )}
        {showTable && <UrlTable />}
      </Container>
    </>
  );
};

export default AppChild;
