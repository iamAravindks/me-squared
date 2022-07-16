import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MenteeContext } from "../context/menteeContext/MenteeContext";
import { MentorContext } from "../context/mentorContext/Context";

const PrivateRouteWrapper = () => {
  const { mentorsState } = useContext(MentorContext);
  const {menteeState} = useContext(MenteeContext)
  const { userMentor } = mentorsState;
  const {userMentee} = menteeState
  return userMentor || userMentee ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteWrapper;
