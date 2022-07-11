import {
  SEARCH_MENTORS,
  SEARCH_MENTOR,
  SET_LOADING,
  REQUEST_SEARCH,
  CLEAR_MENTORS,
} from "../types";

const mentorContextReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_SEARCH:
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
    default:
      break;
  }
};

export default mentorContextReducer;
