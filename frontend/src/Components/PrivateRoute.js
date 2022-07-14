import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MentorContext } from "../context/mentorContext/Context";

const PrivateRouteWrapper = () => {
  const { mentorsState } = useContext(MentorContext);
  const { userMentor } = mentorsState;
  return userMentor ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteWrapper;
