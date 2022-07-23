import React from 'react'
import styles from './browseMentor.module.css'
import image from '../../assets/humanlogo.png'

const Mentor = ({ mentor }) => {
  return (
    
        <li className={styles.mentor} key={mentor.id}>
            <img src={image} width='100px' height='100px' />
            <h3>{mentor.name}</h3>
            <p>{mentor.designation}</p>
            <button>More</button>
        </li>
  )
}

export default Mentor
