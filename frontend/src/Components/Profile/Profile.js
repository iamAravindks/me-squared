import React, { useContext, useEffect } from 'react'
import { MentorContext } from "../../context/mentorContext/Context"
import MentorProfile from './MentorProfile'
import styles from './profile.module.css'
const Profile = () => {

    const { mentorsState,getProfileMentor } = useContext(MentorContext)
    const {userMentor} = mentorsState

  console.log(userMentor.tags)

  return (
        <>
        <MentorProfile />
        {/*<div className={styles.profileContainer}>
      <div className={styles.profileBox}>
        <h1>Profile</h1>
        <div className={styles.profileInfo}>
          <h2>
            <b>Name :</b> {userMentor.name}
          </h2>
          <p>
            <b>email : </b>
            {userMentor.email}
          </p>
          <p>
            <b>designation : </b>
            {userMentor.designation}
          </p>
          <p>
            <b>respond in : </b>
            {userMentor.respondIn}
          </p>
          <p>
            <b>student of : </b>
            {userMentor.yearNdClass}
          </p>
          <p>
            <b>about :</b> {userMentor.about}
          </p>
          <p>
            <b>Whatsapp no :</b>
            {userMentor.watNum}
          </p>
          <p>
            <b>skills and interests</b>
          </p>
          <ul>
            {userMentor.tags &&
              userMentor.tags.map((item) => <li>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>*/}
        </>
            );
}

export default Profile