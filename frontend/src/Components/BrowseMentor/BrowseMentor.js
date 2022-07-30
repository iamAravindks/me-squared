import React, { useContext } from 'react'
import MentorList from './MentorList'
import { useLocation } from 'react-router-dom'
import styles from './browseMentor.module.css'
import MiniSearchBar from './MiniSearchBar'
import Alert from '../Alert/Alert'
import { ErrorContext } from "../../context/errorContext/errorContext"

const BrowseMentor = () => {
  const location = useLocation() 
  const {error} = useContext(ErrorContext)
  return (
    <>
      {error && <Alert severity={"error"} message={error } />}
      <div className={styles.browseContainer}>
        <MiniSearchBar searchTag={location.state.value} />
        <MentorList searchTag={location.state.value} />
      </div>
    </>
  );
}

export default BrowseMentor
