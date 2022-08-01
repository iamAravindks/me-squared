/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { MentorContext } from "../../context/mentorContext/Context"
import { MenteeContext } from "../../context/menteeContext/MenteeContext"
import MentorProfile from './MentorProfile'
import MenteeProfile from './MenteeProfile'
import styles from './profile.module.css'
const Profile = () => {

    const { mentorsState,getProfileMentor } = useContext(MentorContext)
    const {userMentor} = mentorsState

    const { menteeState,getProfileMentee } = useContext(MenteeContext)
    const {userMentee} = menteeState

if(userMentor)
return (
  <MentorProfile />
)

else if(userMentee)
return(
  <MenteeProfile />
)
}

export default Profile