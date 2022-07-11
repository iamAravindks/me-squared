import axios from "axios";
import { createContext, useReducer, useState } from "react";
import mentorContextReducer from "./mentorContextReducer";

import {
  SEARCH_MENTORS,
  SEARCH_MENTOR,
  SET_LOADING,
  REQUEST_SEARCH,
} from "../types";

const mentorInfo = JSON.parse(localStorage.getItem("mentorInfo")) || {};

const initialState = {
  loading: false,
  mentors: [],
  mentor: mentorInfo,
  error: null,
};

export const MentorContext = createContext(initialState);

const Provider = ({ children }) => {
  const [mentorsState, dispatch] = useReducer(
    mentorContextReducer,
    initialState
  );
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // get list of mentors

  const getMentors = async () => {
    try {
      dispatch({
        type: REQUEST_SEARCH,
      });
      const res = await axios.get("/api/mentors", config);
      dispatch({
        type: SEARCH_MENTORS,
        payload: res.data,
      });
      
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
    }
  };
  return (
    <MentorContext.Provider
      value={{
        mentorsState,
        getMentors,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};
export default Provider;
