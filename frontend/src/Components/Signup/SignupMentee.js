import React from "react";
import styles from "./signupmentee.module.css";
import {Link} from 'react-router-dom'
const SignupMentee = () => {
  return (
    <div className={styles.signupmenteeContainer}>
      <div className={styles.logoContainer}>
        <i className="fa-brands fa-squarespace"></i>
      </div>
      <div className={styles.formContainer}>
        <h1>Sign up as a mentee</h1>
        <p>
          Are you looking to become a{" "}
          <Link to="/signupmentor">mentor instead?</Link>
        </p>
        <form>
          <input
            type="text"
            placeholder="Enter your name..."
            name="name"
            required
          />
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            required
          />
          <input type="text" placeholder="skill looks for..." required />
          <input type="tel" placeholder="Whatsapp number..." required />
          <div className={styles.chooseYear}>
            <label for="year">Choose year:</label>
            <select name="year" id="year" required>
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
            </select>
          </div>
          <div className={styles.chooseDep}>
            <label for="department">Choose department:</label>
            <select name="department" id="department" required>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="eee">EEE</option>
              <option value="ece">ECE</option>
              <option value="mech">Mech</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          <input type={"password"} placeholder="Enter your password" required />
          <input
            type={"password"}
            placeholder="password confirmation"
            required
          />
          
          <input type={"button"} value="Signup" />
        </form>
        <div className={styles.otherOption}>
          <p>Already have an account?</p>
          <Link to="/login">
            <button className={styles.signupBtn}>Login here</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupMentee;
