import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import brandLogo from "../../assets/logos/logo.png";
import { Link } from "react-router-dom";

const Topbar = ({
  tabSelected,
  setTabSelected,
  sideNavBarStatus,
  setSideNavBarStatus,
}) => {
  const [isNavbr, setIsNavbr] = useState(false);
  const setNavbar = () => setIsNavbr(window.scrollY >= 80 && true);

  const handleOnclick = (path) =>
  {
    setTabSelected(path);

  }

  useEffect(() => {
    window.addEventListener("scroll", setNavbar);
    return () => {
      window.removeEventListener("scroll", setNavbar);
    };
  }, []);

  return (
    <div
      className={
        isNavbr
          ? `${styles.topBarContainer} ${styles.setNavbar}`
          : styles.topBarContainer
      }
    >
      <Link
        to="/"
        className={styles.topBarBrand}
        onClick={() => setTabSelected("home")}
      >
        <img src={brandLogo} alt="iotek" />
      </Link>
      <div className={styles.topBarMenu}>
        <Link
          to="/"
          className={
            tabSelected === "home"
              ? `${styles.menuItem} ${styles.tabSelected}`
              : `${styles.menuItem}`
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
              ? `${styles.menuItem} ${styles.tabSelected}`
              : `${styles.menuItem}`
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
              ? ` ${styles.tabSelected} ${styles.getStarted}`
              : ` ${styles.getStarted}`
          }
          onClick={() => handleOnclick("signup")}
          data-aos="zoom-in"
        >
          <div className={styles.dropdown}>
            Get Started
            <div className={styles.dropdownContent}>
            <h4>Mentor</h4>
            <h4>Mentee</h4>
            </div>
          </div>
        </Link>
        <Link
          to="/login"
          className={
            tabSelected === "login"
              ? `${styles.menuItem} ${styles.tabSelected}`
              : `${styles.menuItem}`
          }
          onClick={() => handleOnclick("login")}
          data-aos="zoom-in"
        >
          Login
        </Link>
      </div>
      <div
        className={`${styles.hamburger} ${
          sideNavBarStatus ? styles.opened : ""
        }`}
        onClick={() => {
          sideNavBarStatus
            ? setSideNavBarStatus(false)
            : setSideNavBarStatus(true);
        }}
        aria-label={styles.hamburger}
        aria-expanded={sideNavBarStatus ? "opened" : ""}
      >
        <svg
          className={styles.svgImg}
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <path
            className={`${styles.line} ${styles.line1}`}
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className={`${styles.line} ${styles.line2}`} d="M 20,50 H 80" />
          <path
            className={`${styles.line} ${styles.line3}`}
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </div>
    </div>
  );
};

export default Topbar;
