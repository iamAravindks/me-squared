import React, {useState} from 'react'
import styles from './hero.module.css'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const history = useNavigate()

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(search.length > 0)
      history("browsementor",{state:{value: search}})
    setSearch('')
  }

  return (
    <form className={styles.searchBar}>
      <input
        type="text"
        placeholder='Search using keywords like "Java"'
        value={search}
        onChange={updateSearch} required
      />
      <button onClick={onSubmit}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar