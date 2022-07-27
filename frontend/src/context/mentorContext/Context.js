import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import mentorContextReducer from "./mentorContextReducer";

import {
  SEARCH_MENTORS,
  SEARCH_MENTOR,
  REQUEST,
  MENTOR_USER_REGISTER_FAIL,
  MENTOR_USER_REGISTER_SUCCESS,
  MENTOR_USER_LOGIN_FAIL,
  MENTOR_USER_LOGIN_SUCCESS,
  MENTOR_USER_LOGOUT_FAIL,
  MENTOR_USER_LOGOUT,
  MENTOR_USER_PROFILE_SUCCESS,
  MENTOR_USER_PROFILE_FAIL,
  MENTOR_RETREIVE_FOLLOW_REQUESTS,
} from "./mentorTypes";
import { ErrorContext } from "../errorContext/errorContext";
import { uploadImg } from "../../utils/utils";
const userInfo = JSON.parse(localStorage.getItem("userMentor")) || null;

const initialState = {
  loading: false,
  mentors: [],
  mentor: {},
  error: null,
  userMentor: userInfo,
  followReqs: [],
};

export const MentorContext = createContext(initialState);

const Provider = ({ children }) => {
  const [mentorsState, dispatch] = useReducer(
    mentorContextReducer,
    initialState
  );

  const { setError } = useContext(ErrorContext);
  // console.log(mentorsState)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // get list of mentors

  const getMentors = async (tag) => {
    try {
      dispatch({
        type: REQUEST,
      });
      const {data} = await axios.get(`/api/mentors/tag/${tag}`, config);
      dispatch({
        type: SEARCH_MENTORS,
        payload: data.data,
      });
      console.log(data)
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
    }
  };

  const getMentor = async (_id) => {
    try {
      dispatch({
        type: REQUEST,
      });
      const {data} = await axios.get(`/api/mentors/mentor/${_id}`, config);
      dispatch({
        type: SEARCH_MENTOR,
        payload: data.data,
      });
      console.log(data)
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
    password,
    img = null
  ) => {
    try {
      let params = { name, email, designation, watNum, yearNdClass, password };
      dispatch({ type: REQUEST });
      if (img) {
        const profileImg = await uploadImg(img);
      
        params.profileImg = profileImg;
      }

      const { data } = await axios.post("/api/mentors/signup", params, config);
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
      setError(err);
    }
  };

  //  log out

  const logout = async () => {
    try {
      dispatch({ type: REQUEST });
      const { data } = await axios.get("/api/mentors/logout", config);
      if (data.data === "LOG_OUT_MENTOR") {
        dispatch({
          type: MENTOR_USER_LOGOUT,
        });
        localStorage.removeItem("userMentor");
      } else {
        dispatch({
          type: MENTOR_USER_LOGOUT_FAIL,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
      setError(err);
    }
  };

  const getProfileMentor = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.get("/api/mentors/profile", config);
      console.log(data);
      dispatch({
        type: MENTOR_USER_PROFILE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: MENTOR_USER_PROFILE_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
      setError(err);
    }
  };

  const getFollowRequests = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.get("/api/mentors/follow-requests", config);
      console.log(data);
      dispatch({
        type: MENTOR_RETREIVE_FOLLOW_REQUESTS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: MENTOR_RETREIVE_FOLLOW_REQUESTS,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
      setError(err);
    }
  };

  return (
    <MentorContext.Provider
      value={{
        mentorsState,
        getMentors,
        getMentor,
        MentorLogin,
        MentorRegister,
        logout,
        getProfileMentor,
        getFollowRequests,
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};
export default Provider;
