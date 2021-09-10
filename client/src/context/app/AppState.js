import React, { useReducer } from "react";

import AppContext from "./appContext";
import AppReducer from "./appReducer";
import axios from "axios";
import { toast } from "react-toastify";

import {
  SET_FORM_DATA,
  SET_SHORTENED_LINK,
  SET_URL_LIST,
  SET_DISABLE_BUTTON,
  SET_COUNT,
  SET_SHOW_TABLE,
  SET_HAS_BOUNCED,
} from "../types";

const AppState = (props) => {
  const initialState = {
    urlList: [],
    formData: { full: "" },

    disableButton: true,
    showTable: false,
    shortenedLink: "",
    count: 0,
    hasBounced: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const handleCountClick = async (e, increment) => {
    try {
      const redirect = await axios.get(`/urls/${e.target.innerText}`);
      if (redirect.status === 200) {
        increment();
        window.open(e.target.id, "_blank");
        return;
      }
    } catch (err) {
      toast.error("😢 It's not you, it's us. 😢", {
        backgroundColor: "black",
      });
    }
  };
  const formOnChange = (e) => {
    console.log({ e });
    const { formData } = state;

    dispatch({
      type: SET_FORM_DATA,
      payload: { ...formData, [e.target.name]: e.target.value },
    });
    dispatch({
      type: SET_DISABLE_BUTTON,
      payload: false,
    });
  };
  const removeLink = () => {
    dispatch({ type: SET_SHOW_TABLE, payload: !state.showTable });
  };
  const increment = () => {
    dispatch({ type: SET_COUNT, payload: state.count + 1 });
  };

  const registerClick = async (e) => {
    try {
      const redirect = await axios.get(`/urls/${e.target.innerText}`);
      if (redirect.status === 200) {
        increment();
        window.open(e.target.id, "_blank");
        return;
      }
    } catch (err) {
      toast.error("😢 Error: It's not you, it's us. 😢", {
        backgroundColor: "black",
      });
    }
  };
  const getUrls = async () => {
    try {
      const res = await axios.get("/urls");

      if (res.data.error) {
        toast.warn(res.data.error);
      }

      if (res.data.length !== 0) {
        dispatch({ type: SET_URL_LIST, payload: res.data });
      }
    } catch (err) {
      toast.error("😢 It's not you, it's us. 😢", {
        backgroundColor: "black",
      });
    }
  };

  const submitURL = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/shortUrls", formData, config);

      if (res.data.error) {
        dispatch({ type: SET_FORM_DATA, payload: { form: "" } });
        dispatch({ type: SET_SHORTENED_LINK, payload: {} });
        dispatch({ type: SET_FORM_DATA, payload: { full: "" } });

        toast.warn(res.data.error);

        return;
      }

      dispatch({ type: SET_COUNT, payload: state.count + 1 });
      dispatch({ type: SET_FORM_DATA, payload: { full: "" } });
      dispatch({ type: SET_DISABLE_BUTTON, payload: false });
      dispatch({ type: SET_SHORTENED_LINK, payload: res.data });
      dispatch({ type: SET_HAS_BOUNCED, payload: true });
    } catch (err) {
      toast.error("😢 It's not you, it's us. 😢", {
        backgroundColor: "black",
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        urlList: state.urlList,
        formData: state.formData,
        shortenedLink: state.shortenedLink,
        disableButton: state.disableButton,
        showTable: state.showTable,
        shortenedLink: state.shortenedLink,
        count: state.count,
        hasBounced: state.hasBounced,
        submitURL,
        getUrls,
        registerClick,
        increment,
        removeLink,
        formOnChange,
        handleCountClick,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
