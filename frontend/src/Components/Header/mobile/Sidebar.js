import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MenteeContext } from "../../../context/menteeContext/MenteeContext";
import { MentorContext } from "../../../context/mentorContext/Context";
import styles from "./../header.module.css";

const Sidebar = ({ tabSelected, setTabSelected, setSideNavBarStatus }) =>
{
    const handleOnclick = (path) => {
      setTabSelected(path);
      setSideNavBarStatus(prevState=>!prevState)
    };

      const { mentorsState, logout } = useContext(MentorContext);
      const { menteeState, logoutMentee } = useContext(MenteeContext);

      const { userMentor } = mentorsState;
  const { userMentee } = menteeState;
  
    const handleLogout = () => {
      if (userMentor) {
        logout();
      } else if (userMentee) {
        logoutMentee();
      }
    };
  
  return (
    <div className={styles.SidebarMenuContainer} data-aos="fade-down">
      <Link
        to="/"
        className={
          tabSelected === "home"
            ? `${styles.menuItemMob} ${styles.tabSelected}`
            : `${styles.menuItemMob}`
        }
        onClick={() => handleOnclick("home")}
        data-aos="zoom-in"
      >
        Home
      </Link>
      <Link
        to="/profile"
        className={
          tabSelected === "profile"
            ? `${styles.menuItemMob} ${styles.tabSelected}`
            : `${styles.menuItemMob}`
        }
        onClick={() => handleOnclick("profile")}
        data-aos="zoom-in"
      >
        Profile
      </Link>
      {/* <Link
        to="/signup"
        className={
          tabSelected === "signup"
            ? `${styles.menuItemMob} ${styles.tabSelected}`
            : `${styles.menuItemMob}`
        }
        onClick={() => handleOnclick("signup")}
        data-aos="zoom-in"
      >
        <button>Get started</button>
      </Link> */}

      {userMentor || userMentee ? (
        <button className={styles.menuItemBtn} onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <Link
          to="/login"
          className={
            tabSelected === "login"
              ? `${styles.menuItemMob} ${styles.tabSelected}`
              : `${styles.menuItemMob}`
          }
          onClick={() => handleOnclick("login")}
          data-aos="zoom-in"
        >
          Login
        </Link>
      )}

      {/* <Link
        to="/support"
        className={
          tabSelected === "support"
            ? `${styles.menuItemMob} ${styles.tabSelected}`
            : `${styles.menuItemMob}`
        }
        onClick={() => handleOnclick("support")}
        data-aos="zoom-in"
      >
        Support
      </Link> */}
    </div>
  );
};

export default Sidebar;
