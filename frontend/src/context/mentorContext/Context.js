import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import mentorContextReducer from "./mentorContextReducer";

import {
  SEARCH_MENTORS,
  SEARCH_MENTOR,
  SET_LOADING,
  REQUEST,
  MENTOR_USER_REGISTER,
  MENTOR_USER_REGISTER_FAIL,
  MENTOR_USER_REGISTER_SUCCESS,
  MENTOR_USER_LOGIN_FAIL,
  MENTOR_USER_LOGIN_SUCCESS,
} from "../types";
import { ErrorContext } from "../errorContext/errorContext";

const userInfo = JSON.parse(localStorage.getItem("userMentor")) || null;

const initialState = {
  loading: false,
  mentors: [],
  mentor: {},
  error: null,
  userMentor: userInfo,
};

export const MentorContext = createContext(initialState);

const Provider = ({ children }) => {
  const [mentorsState, dispatch] = useReducer(
    mentorContextReducer,
    initialState
  );

  const {setError} = useContext(ErrorContext)
  // console.log(mentorsState)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // get list of mentors

  const getMentors = async () => {
    try {
      dispatch({
        type: REQUEST,
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

  // login mentor

  const MentorLogin = async (email, password) => {
    try {
      dispatch({
        type: REQUEST,
      });

      const { data } = await axios.post(
        "/api/mentors/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      dispatch({
        type: MENTOR_USER_LOGIN_SUCCESS,
        payload: data.data,
      });


    } catch (error) {
      dispatch({
        type: MENTOR_USER_LOGIN_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        setError(err);

    }
  };

  // signup mentor
  const MentorRegister = async (
    name,
    email,
    designation,
    watNum,
    yearNdClass,
    password
  ) => {
    try {
      dispatch({ type: REQUEST });
      const { data } = await axios.post(
        "/api/mentors/signup",
        {
          name,
          email,
          designation,
          watNum,
          yearNdClass,
          password,
        },
        config
      );
      console.log(data);
      dispatch({
        type: MENTOR_USER_REGISTER_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: MENTOR_USER_REGISTER_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
      setError(err)
    }
  };

  return (
    <MentorContext.Provider
      value={{
        mentorsState,
        getMentors,
        MentorLogin,
        MentorRegister,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};
export default Provider;
