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
  MENTOR_RETREIVE_FOLLOW_REQUESTS,
  SEARCH_MENTOR_FAIL,
  SEARCH_MENTORS_FAIL,
  MENTOR_ACCEPT_FOLLOW_REQUEST,
  MENTOR_REJECT_FOLLOW_REQUEST,
} from './mentorTypes';

const mentorContextReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case REQUEST:
      return { ...state, loading: true };

    case SEARCH_MENTORS:
      newState = {
        ...state,
        loading: false,
        mentors: action.payload,
      };
      return newState;

    case SEARCH_MENTOR:
      console.log(action.payload)
      newState = {
        ...state,
        loading: false,
        mentorData: action.payload,
      };
      console.log(newState)
      return newState;

    case CLEAR_MENTORS:
      return {
        loading: false,
        mentors: [],
        ...state,
      };

    case MENTOR_USER_REGISTER_SUCCESS:
    case MENTOR_USER_LOGIN_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentor: action.payload,
      };
      localStorage.setItem('userMentor', JSON.stringify(action.payload));
      localStorage.removeItem('userMentee');
      return newState;

    case MENTOR_USER_PROFILE_SUCCESS:
      newState = {
        ...state,
        loading: false,
        userMentor: action.payload.mentor,
        followers: action.payload.followers,
      };
      return newState;

    case MENTOR_ACCEPT_FOLLOW_REQUEST:
    case MENTOR_REJECT_FOLLOW_REQUEST:
    case MENTOR_RETREIVE_FOLLOW_REQUESTS:
      newState = {
        ...state,
        loading: false,
        followReqs: action.payload,
      };
      return newState;

    case MENTOR_USER_LOGIN_FAIL:
    case MENTOR_USER_REGISTER_FAIL:
    case MENTOR_USER_PROFILE_FAIL:
    case MENTOR_USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userMentor: null,
      };

    case SEARCH_MENTOR_FAIL:
      return {
        ...state,
        mentorData: {},
        loading: false,
      };
    case SEARCH_MENTORS_FAIL:
      return {
        ...state,
        loading: false,
        mentorData: {},
        mentors: [],
      };

    case MENTOR_USER_LOGOUT_FAIL:
      return state;

    default:
      return state;
  }
};

export default mentorContextReducer;
