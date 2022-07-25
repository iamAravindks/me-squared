import React from 'react'
import loader from '../../assets/loader1.svg'
import styles from './loader.module.css'
const Loader = () => {
  return (
      <div className={ styles.loader}><img src={ loader} alt="loading..."/></div>
  )
}

export default Loader