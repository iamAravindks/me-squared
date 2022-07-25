import React from "react";
import { useContext } from "react";
import loader from "../../assets/loader1.svg";
import { MenteeContext } from "../../context/menteeContext/MenteeContext";
import { MentorContext } from "../../context/mentorContext/Context";
import styles from "./loader.module.css";
const Loader = () => {
  const { mentorsState } = useContext(MentorContext);
  const { menteeState } = useContext(MenteeContext);
  if (menteeState.loading || mentorsState.loading) {
    return (
      <div className={styles.loader}>
        <img src={loader} alt="loading..." />
      </div>
    );
  }
};

export default Loader;
