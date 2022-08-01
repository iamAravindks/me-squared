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
  MENTEE_USER_FOLLOW_SUCCESS,
  MENTEE_USER_FOLLOW_FAIL,
  MENTEE_USER_FOLLOWLIST_SUCCESS,
  MENTEE_USER_FOLLOWLIST_FAIL,
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
        ...state,
        loading: false,
        mentors: action.payload,
      };

    case CLEAR_MENTORS:
      return {
        ...state,
        loading: false,
        mentors: [],
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
        ...state,
        loading: false,
        userMentee: null,
      };

    case MENTEE_USER_LOGOUT_FAIL:
      return state;

    case MENTEE_USER_FOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        mentor:{
          ...state.mentor,
          following:action.payload.following
        }
      }
    
    case MENTEE_USER_FOLLOW_FAIL:
      return {
        ...state,
        loading: false,
      };

    // case MENTEE_USER_FOLLOWLIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false
    //   }

    // case MENTEE_USER_FOLLOWLIST_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //   };

    default:
      return state;
  }
};
