import React from 'react'
import styles from "./button.module.css"
import { useNavigate } from 'react-router-dom';

const Button = ( {text, color} ) => {
  const navigate = useNavigate()
  const onSelect =(e) => {
    e.preventDefault()
    navigate('/browsementor', {state:{value: text}})

  }
  return (
    <div>
        <button className={styles.btn} style={{borderTopColor: color}} onClick={onSelect} >{text}</button>
    </div>
  )
}

export default Button;