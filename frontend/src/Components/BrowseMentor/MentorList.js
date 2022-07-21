import React, { useContext, useState, useEffect } from 'react'
import { MentorContext } from '../../context/mentorContext/Context'

const MentorList = ({ searchTag }) => {
    console.log("Testing browse mentor with data",searchTag)
    const { getMentors,mentorsState } = useContext(MentorContext)
    const {mentors} = mentorsState
    useEffect(() => {
        getMentors(searchTag)
    },[])

    
  return (
    <div>
       {
        mentors!==[] ? mentors.map(mentor=><p>{mentor.name}</p>) : ""
       }
    </div>
  )
}

export default MentorList