/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
import {
  SEARCH_MENTORS,
  SEARCH_MENTOR,
  SET_LOADING,
  REQUEST,
  CLEAR_MENTORS,
  MENTOR_USER_LOGIN_SUCCESS,
  MENTOR_USER_LOGIN_FAIL,
  MENTOR_USER_REGISTER_FAIL,
  MENTOR_USER_LOGOUT_FAIL,
  MENTOR_USER_LOGOUT,
  MENTOR_USER_REGISTER_SUCCESS,
  MENTOR_USER_PROFILE_FAIL,
  MENTOR_USER_PROFILE_SUCCESS,
  MENTOR_RETREIVE_FOLLOW_REQUESTS
} from "./mentorTypes";

const mentorContextReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };

    case SEARCH_MENTORS:
      newState={
        ...state,
        loading: false,
        mentors: action.payload,
      };
      return newState

    case CLEAR_MENTORS:
      return {
        loading: false,
        mentors: [],
        ...state,
      };

    case MENTOR_USER_REGISTER_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentor: action.payload,
      };
      localStorage.setItem("userMentor", JSON.stringify(action.payload));
      localStorage.removeItem("userMentee")
      return newState;

    case MENTOR_USER_LOGIN_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentor: action.payload,
      };
      localStorage.setItem("userMentor", JSON.stringify(action.payload));
      localStorage.removeItem("userMentee");

      return newState;

    case MENTOR_USER_PROFILE_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentor: action.payload,
      };
      return newState;

    case MENTOR_USER_LOGIN_FAIL:
    case MENTOR_USER_REGISTER_FAIL:
    case MENTOR_USER_PROFILE_FAIL:
      return {
        loading: false,
        userMentor: null,
        ...state,
      };

    case MENTOR_USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userMentor: null,
      };

    case MENTOR_USER_LOGOUT_FAIL:
      return state;

    case  MENTOR_RETREIVE_FOLLOW_REQUESTS:
      newState = {
        ...state,
        loading:false,
        followReqs:action.payload,
      };
      return newState;

    default:
      return state;
  }
};

export default mentorContextReducer;
