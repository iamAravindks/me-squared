import {
  CLEAR_MENTORS,
  MENTEE_USER_LOGIN_FAIL,
  MENTEE_USER_LOGIN_SUCCESS,
  MENTEE_USER_LOGOUT,
  MENTEE_USER_LOGOUT_FAIL,
  MENTEE_USER_PROFILE_FAIL,
  MENTEE_USER_PROFILE_SUCCESS,
  MENTEE_USER_REGISTER_FAIL,
  MENTEE_USER_REGISTER_SUCCESS,
  REQUEST,
  SEARCH_MENTORS,
} from "./menteeTypes";

export const menteeContextReducer = (state, action) => {
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

    case MENTEE_USER_REGISTER_SUCCESS:
    case MENTEE_USER_LOGIN_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentee: action.payload,
      };
      console.log(newState);
      localStorage.setItem("userMentee", JSON.stringify(action.payload));
      localStorage.removeItem("userMentor");

      return newState;

    case MENTEE_USER_PROFILE_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentee: action.payload,
      };
      return newState;
    
    
    case MENTEE_USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userMentee: null,
      };

    case MENTEE_USER_LOGIN_FAIL:
    case MENTEE_USER_REGISTER_FAIL:
    case MENTEE_USER_PROFILE_FAIL:
      return {
        loading: false,
        userMentee: null,
        ...state,
      };

    case MENTEE_USER_LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
};
