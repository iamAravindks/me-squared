import React from 'react'
import styles from './hero.module.css'
import Button from '../Button/Button'


const Categories = () => {
  return (
    <div className={styles.categoryContainer}>
        <Button color='violet' text='Javascript'/>
        <Button color='green' text='Nodejs'/>
        <Button color='red' text='Python'/>
        <Button color='yellow' text='Data Structures'/>
        <Button color='orange' text='Marketing'/>
        <Button color='firebrick' text='Leadership'/>
        <Button color='pink' text='Communication'/>
        <Button color='crimson' text='C++'/>
        <Button color='black' text='Java'/>
    </div>
  )
}

export default Categories