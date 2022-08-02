import React from 'react'
import Categories from './Categories'
import SearchBar from './SearchBar'
import styles from "./hero.module.css"
import Typed from "react-typed";


const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <h1>
        1-on-1
        <span>
          <Typed
            strings={[
              "Career",
              "Growth",
              "Resume",
              "UI/UX",
              "SEO",
              
            ]}
            typeSpeed={100}
            backSpeed={60}
            loop
          />
        </span>
        Mentorship
      </h1>
      <p>
        {" "}
        If you are looking for a mentor, and you're just not sure about how this works out - this should be !!<br />
        It's easy and we mean it. Search, choose, click, request and you're in! 
      </p>
      <SearchBar />
      <Categories />
    </div>
  );
}

export default Hero