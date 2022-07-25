/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import styles from "./signupmentee.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../../context/errorContext/errorContext";
import { MenteeContext } from "../../context/menteeContext/MenteeContext";
import Alert from "../Alert/Alert";
const SignupMentee = () => {
  const history = useNavigate();
  const { error, setError } = useContext(ErrorContext);
  const { menteeState, menteeRegister } = useContext(MenteeContext);

  const { userMentee } = menteeState;
  const initVal = {
    email: "",
    password: "",
    name: "",
    watNum: null,
    year: "first",
    dep: "cse",
    rePassword: "",
    designation: "",
    skillLooksFor: "",
  };
  const [imgSelect, setImgSelect] = useState(null);
  const [formVal, setFormVal] = useState(initVal);
  const [passErr, setPassErr] = useState(null);
  const {
    email,
    password,
    name,
    watNum,
    year,
    dep,
    rePassword,
    skillLooksFor,
  } = formVal;

  const handleEmail = (e) =>
    setFormVal((prevState) => {
      const newState = { ...prevState, email: e.target.value };
      return newState;
    });
  const handleName = (e) =>
    setFormVal((prevState) => {
      const newState = { ...prevState, name: e.target.value };
      return newState;
    });
  const handleWatnum = (e) => {
    if (!isNaN(e.target.value))
      setFormVal((prevState) => {
        const newState = { ...prevState, watNum: e.target.value };
        return newState;
      });
  };

  const handleYear = (e) =>
    setFormVal((prevState) => {
      const newState = { ...prevState, year: e.target.value };
      return newState;
    });
  const handleDep = (e) =>
    setFormVal((prevState) => {
      const newState = { ...prevState, dep: e.target.value };
      return newState;
    });
  const handlePassword = (e) =>
    setFormVal((prevState) => {
      const newState = { ...prevState, password: e.target.value };
      return newState;
    });
  const handleRePassword = (e) => {
    setFormVal((prevState) => {
      const newState = { ...prevState, rePassword: e.target.value };
      return newState;
    });
    passwordCheck(e.target.value);
  };

  const handleSkill = (e) => {
    setFormVal((prevState) => {
      const newState = { ...prevState, skillLooksFor: e.target.value };
      return newState;
    });
  };

  const passwordCheck = (rep) => {
    if (password !== rep) setPassErr("Password didn't match");
    else setPassErr("");
  };

  const handleImg = (file) => {
    setImgSelect(file);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (passErr) setError(passErr);
    else {
      menteeRegister(
        name,
        email,
        skillLooksFor,
        watNum,
        `${year} ${dep}`,
        password,
        imgSelect
      );
    }
  };

  useEffect(() => {
    if (userMentee) history("/");
  }, [userMentee]);
  return (
    <div className={styles.signupmenteeContainer}>
      {error && <Alert severity={"error"} message={error} />}

      <div className={styles.logoContainer}>
        <i className="fa-brands fa-squarespace"></i>
      </div>
      <div className={styles.formContainer}>
        <h1>Sign up as a mentee</h1>
        <p>
          Are you looking to become a{" "}
          <Link to="/signupmentor">mentor instead?</Link>
        </p>
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Enter your name..."
            name="name"
            required
            value={name}
            onChange={handleName}
          />
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            required
            value={email}
            onChange={handleEmail}
          />
          <input
            type="text"
            placeholder="skill looks for..."
            required
            value={skillLooksFor}
            onChange={handleSkill}
          />
          <input
            type="tel"
            placeholder="Whatsapp number..."
            required
            value={watNum}
            onChange={handleWatnum}
          />
          <div className={styles.chooseYear}>
            <label for="year">Choose year:</label>
            <select
              name="year"
              id="year"
              required
              value={year}
              onChange={handleYear}
            >
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
              <option value="fourth">Fourth</option>
            </select>
          </div>
          <div className={styles.chooseDep}>
            <label for="department">Choose department:</label>
            <select
              name="department"
              id="department"
              required
              value={dep}
              onChange={handleDep}
            >
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="eee">EEE</option>
              {passErr && <p style={{ color: "red" }}>{passErr}</p>}
              <option value="ece">ECE</option>
              <option value="mech">Mech</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          <input
            type={"password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={handlePassword}
          />
          <input
            type={"password"}
            placeholder="password confirmation"
            required
            value={rePassword}
            onChange={handleRePassword}
          />
          {passErr && <p style={{ color: "red" }}>{passErr}</p>}
          <div className={styles.addPic}>
            <label htmlFor="files" className={styles.addImgBtn}>
              Select an Image <i className="fa-solid fa-plus"></i>
            </label>
            <span style={{ marginTop: "2px" }}>(optional)</span>
            <input
              id="files"
              style={{ visibility: "hidden" }}
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                handleImg(e.target.files[0]);
              }}
            />
            {imgSelect && (
              <div className={styles.profileImgInfo}>
                <p>{imgSelect.name}</p>
                <button
                  className={styles.clearBtn}
                  onClick={() => setImgSelect(null)}
                >
                  remove image
                </button>
              </div>
            )}
          </div>
          <input type={"submit"} value="Signup" />
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
