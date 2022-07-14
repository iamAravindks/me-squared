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
} from "../types";

const mentorContextReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };

    case SEARCH_MENTORS:
      return {
        loading: false,
        mentors: action.payload,
        ...state,
      };

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
      return newState;

    case MENTOR_USER_LOGIN_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentor: action.payload,
      };
      localStorage.setItem("userMentor", JSON.stringify(action.payload));
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

    default:
      return state;
  }
};

export default mentorContextReducer;
