import React, { useState, useContext} from 'react'
import styles from './browseMentor.module.css'
import { MentorContext } from '../../context/mentorContext/Context'


const MiniSearchBar = ({ searchTag }) => {
  const [search, setSearch] = useState(searchTag)
  const { getMentors } = useContext(MentorContext)

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(search.length > 0)
      getMentors(search)
  }


  return (
    <form className={styles.miniSearchBar}>
    <input
      type="text"
      placeholder='Search using keywords like "Java"'
      value={search} onChange={updateSearch} required
    />
    <button onClick={onSubmit}>
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>
  )
}

export default MiniSearchBar
