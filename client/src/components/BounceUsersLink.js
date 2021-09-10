import React, { useContext} from 'react';
import styled, { keyframes } from "styled-components";
import { rubberBand } from "react-animations";
import AppContext from "../context/app/appContext";
import axios from 'axios';
import { toast } from "react-toastify";

const BounceUsersLink = () =>{
  const appContext = useContext(AppContext);
  const {increment, shortenedLink, handleCountClick, formData } = appContext
  console.log("UrlTable: ", appContext);
	// const [count, setCount] = useState(0);
  // const increment = () => setCount(count + 1);
	const countClick =  (e) => {
    handleCountClick(e, increment)
  };
	var Bounce = styled.div`
    animation: 1s ${keyframes`${rubberBand}`} 1;
  `;
	return (
    <Bounce>
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
    </Bounce>
  );
}

export default BounceUsersLink