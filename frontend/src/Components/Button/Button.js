import React from 'react'
import styles from "./button.module.css"
import { useNavigate } from 'react-router-dom';

const Button = ({ text, color, dataAos }) =>
{
  const navigate = useNavigate()
  const onSelect =(e) => {
    e.preventDefault()
    navigate('/browsementor', {state:{value: text}})

  }
  return (
    <div data-aos={dataAos}>
        <button className={styles.btn} style={{borderTopColor: color}} onClick={onSelect} >{text}</button>
    </div>
  )
}

export default Button;