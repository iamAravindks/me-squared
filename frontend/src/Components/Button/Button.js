import React from 'react'
import styles from "./button.module.css"

const Button = ( {text, color} ) => {
  return (
    <div>
        <button className={styles.btn} style={{borderTopColor: color}}>{text}</button>
    </div>
  )
}

export default Button;