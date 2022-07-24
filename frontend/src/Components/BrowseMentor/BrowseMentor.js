import React from 'react'
import MentorList from './MentorList'
import { useLocation } from 'react-router-dom'
import styles from './browseMentor.module.css'
import MiniSearchBar from './MiniSearchBar'

const BrowseMentor = () => {
  const location = useLocation() 
  return (
    <div className={styles.browseContainer}>
      <MiniSearchBar searchTag={location.state.value}/>
      <MentorList searchTag={location.state.value} />
    </div>
  )
}

export default BrowseMentor
