import React from "react";
import { Link } from "react-router-dom";
import styles from "./../header.module.css";

const Sidebar = ({ tabSelected, setTabSelected, setSideNavBarStatus }) =>
{
    const handleOnclick = (path) => {
      setTabSelected(path);
      setSideNavBarStatus(prevState=>!prevState)
    };
  return (
    <div className={styles.SidebarMenuContainer}>
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
        to="/findmentor"
        className={
          tabSelected === "findmentor"
            ? `${styles.menuItemMob} ${styles.tabSelected}`
            : `${styles.menuItemMob}`
        }
        onClick={() => handleOnclick("findmentor")}
        data-aos="zoom-in"
      >
        Find a mentor
      </Link>
      <Link
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
      </Link>
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
      <Link
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
      </Link>
    </div>
  );
};

export default Sidebar;
