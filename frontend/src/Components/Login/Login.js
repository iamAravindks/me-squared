import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MentorContext } from "../../context/mentorContext/Context";
import { ErrorContext } from "../../context/errorContext/errorContext";
import Alert from '../Alert/Alert'
import { MenteeContext } from "../../context/menteeContext/MenteeContext";


const Login = () =>
{
  const history = useNavigate();
  const mentorContext = useContext(MentorContext);
  const menteeContext = useContext(MenteeContext)
  const { MentorLogin, mentorsState } = mentorContext;
  const { menteeLogin, menteeState } = menteeContext;
  const { userMentor } = mentorsState
  const {userMentee} = menteeState
  const {error}  = useContext(ErrorContext)




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("mentee");

  const handleChangeType = (e) => {
    const { value } = e.target;
    setType(value);
  };

  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "mentor") {
      MentorLogin(email, password);
    } else if (type === "mentee")
    {
      menteeLogin(email,password)
    }
  };  
  useEffect(() =>
  {

    if ( userMentor)
    {
      history("/")
    }
  }, [userMentor]);

    useEffect(() => {
      if (userMentee) {
        history("/")
      }
    }, [userMentee]);

  return (
    <div className={styles.loginContainer}>
      {error && <Alert severity={"error"} message={error} />}
      {userMentor && <Alert severity={"success"} message={"Successfully logged in"} />}
      <div className={styles.logoContainer}>
        <i className="fa-brands fa-squarespace"></i>
      </div>
      <div className={styles.formContainer}>
        <h1>Login</h1>

        <div className={styles.accountInfo}>
          <h3>Account Type</h3>
          <div className={styles.choiceButtons}>
            <label className={styles.radLabel}>
              <input
                type="radio"
                className={styles.radInput}
                name="rad"
                value="mentor"
                onChange={handleChangeType}
                checked={type === "mentor"}
              />
              <div className={styles.radDesign}></div>
              <div className={styles.text}>Mentor</div>
            </label>

            <label className={styles.radLabel}>
              <input
                type="radio"
                className={styles.radInput}
                name="rad"
                value="mentee"
                onChange={handleChangeType}
                checked={type === "mentee"}
              />
              <div className={styles.radDesign}></div>
              <div className={styles.text}>Mentee</div>
            </label>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type={"email"}
            placeholder="johndoe@example.com"
            required
            value={email}
            onChange={handleEmail}
          />
          <input
            type={"password"}
            placeholder="Password..."
            required
            value={password}
            onChange={handlePassword}
          />
          <input type={"submit"} value="login" />
        </form>
        <div className={styles.otherOption}>
          <p>Don't have an account yet?</p>
          <Link to="/signupmentee">
            <button className={styles.signupBtn}>signup here</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
