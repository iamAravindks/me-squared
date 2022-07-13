import {
  SEARCH_MENTORS,
  SEARCH_MENTOR,
  SET_LOADING,
  REQUEST,
  CLEAR_MENTORS,
  MENTOR_USER_LOGIN_SUCCESS,
  MENTOR_USER_LOGIN_FAIL,
  MENTOR_USER_REGISTER_FAIL,
} from "../types";

const mentorContextReducer = (state, action) => {
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
    
    case MENTOR_USER_LOGIN_SUCCESS:
      
      const newState = {
        ...state,
        loading: false,
        userMentor: action.payload,
      };
      localStorage.setItem("userMentor", JSON.stringify(action.payload));
      console.log(newState)
      return newState;
    
    case MENTOR_USER_LOGIN_FAIL:
    case MENTOR_USER_REGISTER_FAIL:
      return {
        loading: false,
        userMentor: null,
        ...state
      }
    default:
      return state;
  }
};

export default mentorContextReducer;
