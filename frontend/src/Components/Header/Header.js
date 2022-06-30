import React, { useState } from "react";
import Sidebar from "./mobile/Sidebar";
import styles from "./header.module.css";

import Topbar from "./Topbar";

const Header = ({ tabSelected, setTabSelected }) => {
  const [sideNavBarStatus, setSideNavBarStatus] = useState(false);

  return (
    <div className={styles.headerContainer}>
      <Topbar
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
        sideNavBarStatus={sideNavBarStatus}
        setSideNavBarStatus={setSideNavBarStatus}
      />
      {sideNavBarStatus && (
        <Sidebar
          tabSelected={tabSelected}
          setTabSelected={setTabSelected}
          sideNavBarStatus={sideNavBarStatus}
          setSideNavBarStatus={setSideNavBarStatus}
        />
      )}
    </div>
  );
};

export default Header;
