import React from 'react'
import Categories from './Categories'
import SearchBar from './SearchBar'
import styles from "./hero.module.css"

const Hero = () => {
  return (
    <div className={styles.heroContainer}> 
        <h1>1-on-1 Mentorship</h1>
        <p>    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis dolor magnam quos commodi officiis laudantium! Laborum eveniet deleniti incidunt corporis, officia neque, perspiciatis et quaerat, modi aut libero doloremque enim ratione alias molestias ex blanditiis nobis sed nesciunt iure! Nisi.
</p>
        <SearchBar />
        <Categories />
    </div>
  )
}

export default Hero