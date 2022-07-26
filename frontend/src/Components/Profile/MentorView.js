import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MentorContext } from '../../context/mentorContext/Context'

const MentorView = () => {
    const { userID } = useParams()
    const { mentorsState } = useContext(MentorContext)
    const { mentors } = mentorsState
    const mentorWithID = mentors.find(mentor => mentor._id.toString() === userID)
  return (
    <div>
        <h1>{mentorWithID.name}</h1>
        <h2>{mentorWithID.designation}</h2>
        {mentorWithID.tags.map(tag => <h3>{tag}</h3>)}
    </div>
  )
}

export default MentorView