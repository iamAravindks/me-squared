import React, { useContext, useState, useEffect } from 'react'
import { MentorContext } from '../../context/mentorContext/Context'
import Mentor from './Mentor'
import styles from './browseMentor.module.css'

const MentorList = ({ searchTag }) => {
    console.log("Testing browse mentor with data",searchTag)
    const { getMentors,mentorsState } = useContext(MentorContext)
  const { mentors } = mentorsState
  
    useEffect(() => {
        getMentors(searchTag)
    },[])

    
  return (
    <div className={styles.mentorsContainer}>
       {
        mentors!==[] ? mentors.map(mentor => <Mentor mentor={mentor} />) : ""
       }
    </div>
  )
}

export default MentorList