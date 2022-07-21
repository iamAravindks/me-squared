import React from 'react'

const Mentor = ({ mentor }) => {
  return (
    <div>
        <li key={mentor.id}>
            <h2>{mentor.name}</h2>
            <p>{mentor.designation}</p>
        </li>
    </div>
  )
}

export default Mentor
