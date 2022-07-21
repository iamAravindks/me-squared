import React from 'react'

const MiniSearchBar = ({ tag }) => {
  return (
    <form>
    <input
      type="text"
      placeholder='Search using keywords like "Java"'
      value={tag}
      onChange={updateSearch}
    />
    <button onClick={onSubmit}>
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>
  )
}

export default MiniSearchBar
