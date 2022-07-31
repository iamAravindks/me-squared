import React from 'react'
import styles from './hero.module.css'
import Button from '../Button/Button'


const Categories = () => {
  return (
    <div className={styles.categoryContainer}>
        <Button color='red' text='javascript'/>
        <Button color='orange' text='leadership'/>
        <Button color='yellow' text='cloud computing'/>
        <Button color='red' text='nodejs'/>
        <Button color='orange' text='Marketing'/>
        <Button color='yellow' text='CAD'/>
        <Button color='red' text='python'/>
        <Button color='orange' text='Communication'/>
        <Button color='red' text='Java'/>
        <Button color='yellow' text='azure'/>
    </div>
  )
}

export default Categories