import {
 
  SET_FORM_DATA,
  SET_SHORTENED_LINK,
  SET_URL_LIST,
  SET_DISABLE_BUTTON,
  SET_COUNT,
  SET_SHOW_TABLE,
  SET_HAS_BOUNCED
} from "../types";

const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case SET_SHORTENED_LINK:
      return {
        ...state,
        shortenedLink: action.payload,
      };
    case SET_URL_LIST:
      return {
        ...state,
        urlList: action.payload,
      };
    case SET_DISABLE_BUTTON:
      return {
        ...state,
        disableButton: action.payload,
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case SET_SHOW_TABLE:
      return {
        ...state,
        showTable: action.payload,
      };
    case SET_HAS_BOUNCED:
      return {
        ...state,
        hasBounced: action.payload,
      };
  }
};

export default AppReducer
