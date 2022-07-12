import React, {useState, useContext} from 'react'
import styles from './hero.module.css'
import { MentorContext } from '../../context/mentorContext/Context';

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const mentor = useContext(MentorContext)

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSearch('')
  }

  return (
    <form className={styles.searchBar}>
      <input
        type="text"
        placeholder='Search using keywords like "Java"'
        value={search}
        onChange={updateSearch}
      />
      <button onClick={onSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar