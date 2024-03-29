import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { uploadImg } from "../../utils/utils";
import { ErrorContext } from "../errorContext/errorContext";
import {menteeContextReducer} from "./MenteeContextReducer";
import {
  MENTEE_USER_LOGIN_FAIL,
  MENTEE_USER_LOGIN_SUCCESS,
  MENTEE_USER_LOGOUT,
  MENTEE_USER_LOGOUT_FAIL,
  MENTEE_USER_REGISTER_FAIL,
  MENTEE_USER_REGISTER_SUCCESS,
  MENTEE_USER_PROFILE_SUCCESS,
  MENTEE_USER_PROFILE_FAIL,
  MENTEE_USER_FOLLOW_SUCCESS,
  MENTEE_USER_FOLLOW_FAIL,
  VIEW_MENTEE,
  VIEW_MENTEE_FAIL,
  REQUEST,
} from "./menteeTypes";

const userInfo = JSON.parse(localStorage.getItem("userMentee")) || null;

const initialState = {
  loading: false,
  error: null,
  userMentee: userInfo,
  following: [],
  menteeData: {}
};

export const MenteeContext = createContext(initialState);

const Provider = ({ children }) => {
  const [menteeState, dispatch] = useReducer(
    menteeContextReducer,
    initialState
  );
  const { setError } = useContext(ErrorContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // login mentee

  const menteeLogin = async (email, password) => {
    try {
      dispatch({
        type: REQUEST,
      });

      const { data } = await axios.post(
        "/api/mentees/login",
        {
          email,
          password,
        },
        config
      );
      dispatch({
        type: MENTEE_USER_LOGIN_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: MENTEE_USER_LOGIN_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(err);
    }
  };



    const menteeRegister = async (
      name,
      email,
      skillLooksFor,
      watNum,
      yearNdClass,
      password,
      img = null
    ) => {
      try {
        let params = {
          name,
          email,
          skillLooksFor,
          watNum,
          yearNdClass,
          password,
        };
        dispatch({ type: REQUEST });
        if (img) {
          const profileImg = await uploadImg(img);

          params.profileImg = profileImg;
        }

        const { data } = await axios.post(
          "/api/mentees/signup",
          params,
          config
        );
        console.log(data)
        dispatch({
          type: MENTEE_USER_REGISTER_SUCCESS,
          payload: data.data,
        });
      } catch (error) {
        dispatch({
          type: MENTEE_USER_REGISTER_FAIL,
        });
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(err);
        setError(err);
      }
    };

    //follow a mentor
    const followMentor = async (_id) => {
      try {
        dispatch({ type: REQUEST });
        const { data } = await axios.post(`/api/mentees/follow-mentor/${_id}`, config)
        dispatch({
          type: MENTEE_USER_FOLLOW_SUCCESS,
          payload: data.data,
        });
        console.log(data)
      } catch(error) {
        dispatch({
          type: MENTEE_USER_FOLLOW_FAIL,
        });
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(err);
        setError(err);
      }
    }
  
  
  //profile Mentee
  const getProfileMentee = async () => {
    try {
      dispatch({
        type: REQUEST,
      });
      const { data } = await axios.get("/api/mentees/profile", config);
      console.log(data);
      dispatch({
        type: MENTEE_USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MENTEE_USER_PROFILE_FAIL,
      });
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
      setError(err);
    }
  };

  //Mentee View
  const getMenteeView = async (_id) => {
    try {
      dispatch({
        type: REQUEST,
      });
      const {data} = await axios.get(`/api/mentees/mentee/${_id}`, config);
      dispatch({
        type: VIEW_MENTEE,
        payload: data.data,
      });
    } catch (error)
    {
      dispatch({
        type:VIEW_MENTEE_FAIL
      })
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(err);
      setError(err);
    }
  };
  
  
  //log out mentee

  //  log out

  const logoutMentee = async () => {
    try {
      dispatch({ type: REQUEST });
      const { data } = await axios.get("/api/mentees/logout", config);
      if (data.data === "LOG_OUT_MENTEE") {
        dispatch({
          type: MENTEE_USER_LOGOUT,
        });
        localStorage.removeItem("userMentee");
        console.log(menteeState)
      } else {
        dispatch({
          type: MENTEE_USER_LOGOUT_FAIL,
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
  return (
    <MenteeContext.Provider
      value={{
        menteeState,
        menteeLogin,
        logoutMentee,
        menteeRegister,
        getProfileMentee,
        followMentor,
        getMenteeView,
      }}
    >
      {children}
    </MenteeContext.Provider>
  );
};

export default Provider
