import React from 'react'
import styles from './login.module.css'

const Home = () => {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
       <div className={styles.inputContainer}>
         <label>Username </label>
         <input type="text" name="uname" required />
       </div>
       <div className={styles.inputContainer}>
         <label>Password </label>
         <input type="password" name="pass" required />
       </div>
       <div className={styles.buttonContainer}>
         <input type="submit" value="Login" />
       </div>
     </form>
    </div>
     )
}

export default Home