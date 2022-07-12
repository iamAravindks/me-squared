import React from 'react'
import styles from './home.module.css'
import Hero from "../Hero/Hero"

const Home = () => {
  return (
      <section className={ styles.homeContainer}>
        <Hero />
      </section>
  )
}

export default Home