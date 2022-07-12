import React from "react";
import styles from "./login.module.css";
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <i className="fa-brands fa-squarespace"></i>
      </div>
      <div className={styles.formContainer}>
        <h1>Login</h1>

        <div className={styles.accountInfo}>
          <h2>Account Type</h2>
          <div className={styles.choiceButtons}>
            <label className={styles.radLabel}>
              <input type="radio" className={styles.radInput} name="rad" />
              <div className={styles.radDesign}></div>
              <div className={styles.text}>Mentor</div>
            </label>

            <label className={styles.radLabel}>
              <input type="radio" className={styles.radInput} name="rad" />
              <div className={styles.radDesign}></div>
              <div className={styles.text}>Mentee</div>
            </label>
          </div>
        </div>
        <form className={styles.form}>
          <input type={"email"} placeholder="johndoe@example.com" required />
          <input type={"password"} placeholder="Password..." required />
          <input type={"button"} value="login" />
        </form>
        <div className={styles.otherOption}>
          <p>Don't have an account yet?</p>
          <Link to="/signupmentee">
            <button className={styles.signupBtn}>
              signup here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
