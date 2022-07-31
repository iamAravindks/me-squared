import React, { useContext, useState, useEffect } from 'react'
import { MentorContext } from '../../context/mentorContext/Context'
import Mentor from './Mentor'
import styles from './browseMentor.module.css'
import { ReactComponent as Search } from "../../assets/search.svg";
const MentorList = ({ searchTag }) => {
    const { getMentors,mentorsState } = useContext(MentorContext)
  const { mentors } = mentorsState
  
    useEffect(() => {
        getMentors(searchTag)
    },[])

    
  return (
    <div className={styles.mentorsContainer}>
      {mentors.length > 0 ? (
        mentors.map((mentor) => <Mentor mentor={mentor} key={mentor._id} />)
      ) : (
        <div className={styles.nofound}>
            <Search />
            <p>Sorry, no mentors found</p>
        </div>
      )}
    </div>
  );
}

export default MentorList